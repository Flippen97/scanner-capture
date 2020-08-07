package app.captureid.decoder;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.util.Log;
import android.content.Context;

import java.util.ArrayList;
import java.util.Arrays;
import java.lang.Object;
import java.util.HashMap;

import com.codecorp.decoder.CortexDecoderLibrary;
import com.codecorp.symbology.*;

import app.p4it.captureidlibrary.CameraButtons;
import app.p4it.captureidlibrary.CaptureID;
import app.p4it.captureidlibrary.PluginResultObject;
import app.p4it.captureidlibrary.ResultHandler;
import app.p4it.captureidlibrary.SizeData;
import app.p4it.captureidlibrary.StringList;
import app.p4it.captureidlibrary.SymbologyData;
import app.p4it.captureidlibrary.SymbologyDataComparator;
import app.p4it.captureidlibrary.SymbologyDataList;

public class CaptureIDDecoder extends CordovaPlugin {
    private static final String TAG = "CaptureIDDecoder";

    private enum CaptureIDSharedPrefsKey {
        KEY_TYPE("app.captureid.decoder_key_type"), KEY_DATA("app.captureid.decoder_key_data"),
        KEY_FILE_NAME("app.captureid.decoder_key_file_name"), KEY_CUSTOMER_ID("app.captureid.decoder_key_customer_id");

        private final String value;

        CaptureIDSharedPrefsKey(String value) {
            this.value = value;
        }

        public String getValue() {
            return this.value;
        }
    }

    private enum CaptureIDLicenseType {
        SDK("SDK"), EDK("EDK");

        private final String value;

        CaptureIDLicenseType(String value) {
            this.value = value;
        }

        public String getValue() {
            return this.value;
        }
    }

    private CaptureID mCaptureID = null;
    private CallbackContext mLicenseCallbackContext;
    private CallbackContext mDecodeCallbackContext;
    private ArrayList<CameraButtons> mCameraButtons;
    private boolean mShowCrossHair = false;
    private boolean mTorchOn = false;
    private boolean mNativeZoom = false;
    private String[] PERMISSIONS = { "android.permission.CAMERA", "android.permission.INTERNET",
            "android.permission.WRITE_EXTERNAL_STORAGE" };
    private float mMaxZoom = 1f, mMinZoom = 1f;
    private float mCurrentZoom = 1f;
    private boolean mLogMode = false;
    private static int STRINGVALUE = 1;
    private static int INTEGERVALUE = 2;
    private static int BOOLEANVALUE = 3;
    private static int DOUBLEVALUE = 4;
    private static int LONGVALUE = 5;
    private static final String sharedPrefsName = "app.captureid.decoder.sharedPrefs";
    private static final ArrayList<String> funcs = new ArrayList<String>(Arrays.asList("activateLicense",
            "captureCurrentImageInBuffer", "changeBeepPlayerSound", "closeCamera", "closeSharedObject", "CRD_Set",
            "currentSizeOfDecoderVideo", "decoderTimeLimitInMilliseconds", "decoderVersion", "decoderVersionLevel",
            "doDecode", "enableBeepPlayer", "enableFixedExposureMode", "enableScannedImageCapture",
            "enableVibrateOnScan", "ensureRegionOfInterest", "generateDeviceID", "getCameraPreview", "getDecodeVal",
            "getExposureTime", "getFocusDistance", "getLicensedSymbologies", "getMaxZoom", "getSdkVersion",
            "getSensitivityBoost", "getSizeForROI", "getSupportedCameraTypes", "getSupportedFocusModes",
            "getSupportedWhiteBalance", "getZoomRatios", "hasTorch", "isLicenseActivated", "isLicenseExpired",
            "isZoomSupported", "libraryVersion", "loadLicenseFile", "lowContrastDecodingEnabled", "playBeepSound",
            "regionOfInterestHeight", "regionOfInterestLeft", "regionOfInterestTop", "regionOfInterestWidth",
            "setAutoFocusResetByCount", "setCallback", "setCameraType", "setCameraZoom", "setDecoderResolution",
            "setDecoderToleranceLevel", "setEncodingCharsetName", "setExactlyNBarcodes", "setExposureSensitivity",
            "setExposureTime", "setFocus", "setFocusDistance", "setLicenseCallback", "setNumberOfBarcodesToDecode",
            "setTorch", "setWhiteBalance", "CortexDecoderLibrary", "startCameraPreview", "startDecoding",
            "stopCameraPreview", "stopDecoding", "stringFromSymbologyType", "setSymbologyProperties",
            "setCameraButtons", "showCrossHair", "toggleCamera", "enableNativeZoom", "enableSeekBarZoom",
            "enableAugmentedReality", "ar_showVisualizeBarcodes", "ar_detectBarcode", "ar_showDetails",
            "enableAllDecoders", "activateEDKLicense", "initCaptureID", "iOS_showAppSettings"));

    private boolean mIsCameraPreviewOn = false;
    private boolean mIsDecoderOn = false;

    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        Log.d(TAG, "Initializing CortexDecoderLibrary");
    }

    @Override
    public void onDestroy() {
        Log.d(TAG, "shutdown procedure");
        if (null != mCaptureID) {
            mCaptureID.closeCamera();
            mCaptureID.closeSharedObject();
            mCaptureID = null;
        }
    }

    @Override
    public void onPause(boolean multitasking) {
        super.onPause(multitasking);
        if (this.mCaptureID != null) {
            mCaptureID.closeCamera();
        }
    }

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);

        if (this.mCaptureID != null) {
            if (mIsCameraPreviewOn) {
                this.startCameraPreview();
            }
            if (mIsDecoderOn) {
                this.startDecoding();
            }
        }

        /*
         * private void buildCaptureID()
         */
        // if (this.mCaptureID == null) {
        // this.mCaptureID = new CaptureID(cordova.getActivity());
        // if(!this.mCaptureID.isLicenseActivated()) {
        // if(readSettings(CaptureIDSharedPrefsKey.KEY_TYPE).equals(CaptureIDLicenseType.EDK.getValue()))
        // {
        // String filename = readSettings(CaptureIDSharedPrefsKey.KEY_FILE_NAME);
        // String customerID = readSettings(CaptureIDSharedPrefsKey.KEY_CUSTOMER_ID);
        // if(!filename.equals("") && !customerID.equals(""))
        // this.activateEDKLicense(filename, customerID);
        // } else {
        // }
        // }
        // }
    }

    private void activateEDKLicense(String filename, String customerID) {
        mCaptureID.activateEDKLicense(filename, customerID, new ResultHandler() {
            @Override
            public void sendResult(PluginResultObject pluginResultObject) {
                PluginResult result = new PluginResult(PluginResult.Status.OK, pluginResultObject.toJSON());
                mLicenseCallbackContext.sendPluginResult(result);
            }
        });
    }

    private void activateLicense(String productKey) {
        mCaptureID.activateLicense(productKey.equals("") ? preferences.getString("CortexLicenseKey", "") : productKey,
                new ResultHandler() {
                    @Override
                    public void sendResult(PluginResultObject pluginResultObject) {
                        PluginResult result = new PluginResult(PluginResult.Status.OK, pluginResultObject.toJSON());
                        mLicenseCallbackContext.sendPluginResult(result);
                    }
                });
    }

    private void captureCurrentImageInBuffer() {
        // mCaptureID.captureCurrentImageInBuffer();
    }

    private void changeBeepPlayerSound(java.lang.String name) {
        mCaptureID.changeBeepPlayerSound(name);
    }

    private void closeCamera() {
        mCaptureID.closeCamera();
    }

    private void closeSharedObject() {
        mCaptureID.closeSharedObject();
    }

    private static int CRD_Set(int property, boolean value) {
        return CortexDecoderLibrary.CRD_Set(property, value);
    }

    private static int CRD_Set(int property, java.nio.ByteBuffer value) {
        return CortexDecoderLibrary.CRD_Set(property, value);
    }

    private static int CRD_Set(int property, int value) {
        return CortexDecoderLibrary.CRD_Set(property, value);
    }

    private SizeData currentSizeOfDecoderVideo() {
        com.codecorp.util.Size res = mCaptureID.currentSizeOfDecoderVideo();
        return new SizeData(res.width, res.height);
    }

    private void decoderTimeLimitInMilliseconds(int milliseconds) {
        mCaptureID.decoderTimeLimitInMilliseconds(milliseconds);
    }

    private String decoderVersion() {
        return mCaptureID.decoderVersion();
    }

    private String decoderVersionLevel() {
        return mCaptureID.decoderVersionLevel();
    }

    private void doDecode(java.nio.ByteBuffer pixBuf, int width, int height, int stride) {
        mCaptureID.doDecode(pixBuf, width, height, stride);
    }

    private void enableBeepPlayer(boolean enable) {
        mCaptureID.enableBeepPlayer(enable);
    }

    private void enableFixedExposureMode(boolean enabled, java.lang.Long exposureValue) {
        mCaptureID.enableFixedExposureMode(enabled);
    }

    private void enableScannedImageCapture(boolean enable) {
        mCaptureID.enableScannedImageCapture(enable);
    }

    private void enableVibrateOnScan(boolean enable) {
        mCaptureID.enableVibrateOnScan(enable);
    }

    private void ensureRegionOfInterest(boolean enable) {
        mCaptureID.ensureRegionOfInterest(enable);
    }

    private void generateDeviceID() {
        mCaptureID.generateDeviceID(new ResultHandler() {
            @Override
            public void sendResult(PluginResultObject pluginResultObject) {
                PluginResult result = new PluginResult(Status.OK, pluginResultObject.toJSON());
            }
        });
    }

    private android.view.View getCameraPreview() {
        return mCaptureID.getCameraPreview();
    }

    private int getDecodeVal() {
        return 0;
    }

    private long getFixedExposureTime() {
        return mCaptureID.getFixedExposureTime();
    }

    private float[] getFocusDistance() {
        return mCaptureID.getFocusDistance();
    }

    private SymbologyDataList getLicensedSymbologies() {
        SymbologyDataList res = new SymbologyDataList<SymbologyData>();
        SymbologyDataList ls = mCaptureID.getLicensedSymbologies();
        res = ls;
        res.sortBy(SymbologyDataComparator.Order.Name);
        return res;
    }

    private float getMaxZoom() {
        return mCaptureID.getMaxZoom();
    }

    private String getSdkVersion() {
        return mCaptureID.getSdkVersion();
    }

    private StringList getSensitivityBoost() {
        ArrayList<Object> tmp = mCaptureID.getSensitivityBoost();
        StringList res = new StringList();
        for (Object s : tmp) {
            res.add(s.toString());
        }
        return res;
    }

    private SizeData getSizeForROI() {
        ArrayList<Object> res = mCaptureID.getSizeForROI();
        if (res == null)
            return null;
        ArrayList tmp = new ArrayList();
        for (Object ob : res) {
            tmp.add(ob.toString());
        }
        SizeData result = (SizeData) tmp.get(0);
        return result;
    }

    private ArrayList<Object> getSupportedCameraTypes() {
        return mCaptureID.getSupportedCameraTypes();
    }

    private ArrayList<Object> getSupportedFocusModes() {
        return mCaptureID.getSupportedFocusModes();
    }

    private String[] getSupportedWhiteBalance() {
        return mCaptureID.getSupportedWhiteBalance();
    }

    private float[] getZoomRatios() {
        return mCaptureID.getZoomRatios();
    }

    private boolean hasTorch() {
        return mCaptureID.hasTorch();
    }

    private boolean isLicenseActivated() {
        return mCaptureID.isLicenseActivated();
    }

    private boolean isLicenseExpired() {
        return mCaptureID.isLicenseExpired();
    }

    private boolean isZoomSupported() {
        return mCaptureID.isZoomSupported();
    }

    private String libraryVersion() {
        return mCaptureID.libraryVersion();
    }

    private void loadLicenseFile(java.lang.String fileContent) {
        mCaptureID.loadLicenseFile(fileContent);
    }

    private void lowContrastDecodingEnabled(boolean enabled) {
        mCaptureID.lowContrastDecodingEnabled(enabled);
    }

    private void playBeepSound() {
        mCaptureID.playBeepSound();
    }

    private void regionOfInterestHeight(int roiHeight) {
        mCaptureID.regionOfInterestHeight(roiHeight);
    }

    private void regionOfInterestLeft(int column) {
        mCaptureID.regionOfInterestLeft(column);
    }

    private void regionOfInterestTop(int row) {
        mCaptureID.regionOfInterestTop(row);
    }

    private void regionOfInterestWidth(int roiWidth) {
        mCaptureID.regionOfInterestWidth(roiWidth);
    }

    private void setAutoFocusResetByCount(boolean mEnabled) {
        mCaptureID.setAutoFocusResetByCount(mEnabled);
    }

    private void setCallback(com.codecorp.decoder.CortexDecoderLibraryCallback callback) {
        // mCaptureID.setCallback(callback);
    }

    private boolean setCameraType(String cameraType) {
        return mCaptureID.setCameraType(cameraType);
    }

    private void setCameraZoom(boolean enabled, float zoom) {
        mCaptureID.setCameraZoom(enabled, zoom);
    }

    private void setDecoderResolution(String resolution) {
        mCaptureID.setDecoderResolution(resolution);
    }

    private void setDecoderToleranceLevel(int toleranceLevel) {
        mCaptureID.setDecoderToleranceLevel(toleranceLevel);
    }

    private void setEncodingCharsetName(java.lang.String charsetName) {
        mCaptureID.setEncodingCharsetName(charsetName);
    }

    private void setExactlyNBarcodes(boolean enable) {
        mCaptureID.setExactlyNBarcodes(enable);
    }

    private void setExposureSensitivity(java.lang.String iso) {
        mCaptureID.setExposureSensitivity(iso);
    }

    private void setFixedExposureTime(java.lang.Long ep) {
        mCaptureID.setFixedExposureTime(ep);
    }

    private boolean setFocus(String focus) {
        return mCaptureID.setFocus(focus);
    }

    private void setFocusDistance(float distance) {
        mCaptureID.setFocusDistance(distance);
    }

    private void setNumberOfBarcodesToDecode(int num) {
        mCaptureID.setNumberOfBarcodesToDecode(num);
    }

    private void setTorch() {
        if (mCaptureID.hasTorch()) {
            this.mTorchOn = !this.mTorchOn;
            this.setTorch(this.mTorchOn);
        }
    }

    private void setTorch(boolean on) {
        mCaptureID.setTorch(on);
    }

    private void setWhiteBalance(boolean enable, java.lang.String mBalance) {
        mCaptureID.setWhiteBalance(enable, mBalance);
    }

    private void startCameraPreview() {
        this.mIsCameraPreviewOn = true;
        mCaptureID.startCameraPreview();
    }

    private void startDecoding() {
        this.mIsDecoderOn = true;
        this.mCaptureID.showCrossHair(mShowCrossHair);
        this.mCaptureID.startDecoding(new ResultHandler() {
            @Override
            public void sendResult(PluginResultObject pluginResultObject) {
                PluginResult res = new PluginResult(Status.OK, pluginResultObject.toJSON());
                mDecodeCallbackContext.sendPluginResult(res);
                if (pluginResultObject.getStringValue().equals("canceled")) {
                    mIsCameraPreviewOn = false;
                    mIsDecoderOn = false;
                }
            }
        });
    }

    private void stopCameraPreview() {
        this.mIsCameraPreviewOn = false;
        this.mCaptureID.stopCameraPreview();
    }

    private void stopDecoding() {
        this.mIsDecoderOn = false;
        this.mCaptureID.stopDecoding();
        if (mDecodeCallbackContext != null) {
            PluginResult res = new PluginResult(Status.OK, "stopDecoding");
            res.setKeepCallback(false);
            mDecodeCallbackContext.sendPluginResult(res);
        }
    }

    private java.lang.String stringFromSymbologyType(String type) {
        SymbologyType value = SymbologyType.valueOf(type);
        java.lang.String res = mCaptureID.stringFromSymbologyType(type);
        return res;
    }

    private HashMap<String, Object> parsePreferences(JSONArray args) {
        try {
            HashMap<String, Object> res = new HashMap<String, Object>();
            for (int i = 0; i < args.length(); i++) {
                JSONObject object = args.getJSONObject(i);
                Object val = null;
                if (object.get("type").equals("boolean")) {
                    val = object.getBoolean("value");
                } else if (object.get("type").equals("integer")) {
                    val = object.getInt("value");
                } else if (object.get("type").equals("enum")) {
                    val = object.getString("value");
                }
                res.put(object.getString("key"), val);
            }
            return res;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    private void setSymbologyProperties(JSONArray args) {
        HashMap<String, Object> propertiesHash;
        String symbology = (String) parse(args, "symbology", STRINGVALUE);
        try {
            SymbologyProperties props = null;
            propertiesHash = parsePreferences((JSONArray) args.get(1));
            if (symbology.equals("SymbologyType_EAN13")) {
                Symbologies.EAN13Properties sp = new Symbologies.EAN13Properties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");

                sp.supplemental2DigitDecodingEnabled = (Boolean) propertiesHash
                        .get("supplemental2DigitDecodingEnabled");
                sp.supplemental5DigitDecodingEnabled = (Boolean) propertiesHash
                        .get("supplemental5DigitDecodingEnabled");

                sp.stripCheckDigitEnabled = (Boolean) propertiesHash.get("stripCheckDigitEnabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_EAN8")) {
                Symbologies.EAN8Properties sp = new Symbologies.EAN8Properties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");

                sp.supplemental2DigitDecodingEnabled = (Boolean) propertiesHash
                        .get("supplemental2DigitDecodingEnabled");
                sp.supplemental5DigitDecodingEnabled = (Boolean) propertiesHash
                        .get("supplemental5DigitDecodingEnabled");

                sp.stripCheckDigitEnabled = (Boolean) propertiesHash.get("stripCheckDigitEnabled");
                sp.convertToEAN13Enabled = (Boolean) propertiesHash.get("convertToEAN13Enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_QR")) {
                Symbologies.QRProperties sp = new Symbologies.QRProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                sp.mirrorDecodingEnabled = (Boolean) propertiesHash.get("mirrorDecodingEnabled");
                sp.model1DecodingEnabled = (Boolean) propertiesHash.get("model1DecodingEnabled");
                sp.polarity = Symbologies.QRPropertiesPolarity.valueOf(String.valueOf(propertiesHash.get("polarity")));
                props = sp;
            } else if (symbology.equals("SymbologyType_DataMatrix")) {
                Symbologies.DataMatrixProperties sp = new Symbologies.DataMatrixProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                sp.extendedRectEnabled = (Boolean) propertiesHash.get("extendedRectEnabled");
                sp.mirrorDecodingEnabled = (Boolean) propertiesHash.get("mirrorDecodingEnabled");
                sp.polarity = Symbologies.DataMatrixPropertiesPolarity
                        .valueOf(String.valueOf(propertiesHash.get("polarity")));
                props = sp;
            } else if (symbology.equals("SymbologyType_UPCE")) {
                Symbologies.UPCEProperties sp = new Symbologies.UPCEProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                sp.expansionEnabled = (Boolean) propertiesHash.get("expansionEnabled");
                sp.stripCheckDigitEnabled = (Boolean) propertiesHash.get("stripCheckDigitEnabled");
                sp.stripUPCESystemNumberDigitEnabled = (Boolean) propertiesHash
                        .get("stripUPCESystemNumberDigitEnabled");

                sp.supplemental2DigitDecodingEnabled = (Boolean) propertiesHash
                        .get("supplemental2DigitDecodingEnabled");
                sp.supplemental5DigitDecodingEnabled = (Boolean) propertiesHash
                        .get("supplemental5DigitDecodingEnabled");

                props = sp;
            } else if (symbology.equals("SymbologyType_Code128")) {
                Symbologies.Code128Properties sp = new Symbologies.Code128Properties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_Interleaved2of5")) {
                Symbologies.Interleaved2of5Properties sp = new Symbologies.Interleaved2of5Properties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                sp.checksumProperties = Symbologies.Interleaved2of5PropertiesChecksum
                        .valueOf(String.valueOf(propertiesHash.get("checksumProperties")));

                // todo
                // sp.quietZone = (int) propertiesHash.get("quietZone");
                props = sp;
            } else if (symbology.equals("SymbologyType_Code39")) {
                Symbologies.Code39Properties sp = new Symbologies.Code39Properties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                sp.asciiModeEnabled = (Boolean) propertiesHash.get("asciiModeEnabled");
                sp.checksumProperties = Symbologies.Code39PropertiesChecksum
                        .valueOf(String.valueOf(propertiesHash.get("checksumProperties")));
                sp.stripStartStopCharactersEnabled = (Boolean) propertiesHash.get("stripStartStopCharactersEnabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_QRMicro")) {
                Symbologies.MicroQRProperties sp = new Symbologies.MicroQRProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_Pharmacode")) {
                Symbologies.PharmacodeProperties sp = new Symbologies.PharmacodeProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                sp.maximumBars = (Integer) propertiesHash.get("maximumBars");
                sp.maximumValue = (Integer) propertiesHash.get("maximumValue");
                sp.minimumBars = (Integer) propertiesHash.get("minimumBars");
                sp.minimumValue = (Integer) propertiesHash.get("minimumValue");
                props = sp;
            } else if (symbology.equals("SymbologyType_Code32")) {
                Symbologies.Code32Properties sp = new Symbologies.Code32Properties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_Code93")) {
                Symbologies.Code93Properties sp = new Symbologies.Code93Properties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_USPSPlanet")) {
                Symbologies.USPSPlanetProperties sp = new Symbologies.USPSPlanetProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_NEC2of5")) {
                Symbologies.NEC2of5Properties sp = new Symbologies.NEC2of5Properties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                sp.checksumProperties = Symbologies.Symbology2of5PropertiesChecksum
                        .valueOf(String.valueOf(propertiesHash.get("checksumProperties")));
                props = sp;
            } else if (symbology.equals("SymbologyType_MC")) {
                Symbologies.MaxiCodeProperties sp = new Symbologies.MaxiCodeProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_MSIPlessy")) {
                Symbologies.MSIPlesseyProperties sp = new Symbologies.MSIPlesseyProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                sp.checksumProperties = Symbologies.MSIPlesseyPropertiesChecksum
                        .valueOf(String.valueOf(propertiesHash.get("checksumProperties")));
                sp.stripChecksumEnabled = (Boolean) propertiesHash.get("stripChecksumEnabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_PDF417")) {
                Symbologies.PDF417Properties sp = new Symbologies.PDF417Properties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                // todo
                // sp.dlParsing =
                // Symbologies.DLProperties.valueOf(String.valueOf(propertiesHash.get("dlParsing")));
                props = sp;
            } else if (symbology.equals("SymbologyType_Code49")) {
                Symbologies.Code49Properties sp = new Symbologies.Code49Properties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_JapanMail")) {
                Symbologies.JapanPostProperties sp = new Symbologies.JapanPostProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_Trioptic")) {
                Symbologies.TriopticProperties sp = new Symbologies.TriopticProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                sp.stripStartStopCharactersEnabled = (Boolean) propertiesHash.get("stripStartStopCharactersEnabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_Straight2of5")) {
                Symbologies.Straight2of5Properties sp = new Symbologies.Straight2of5Properties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                sp.checksumProperties = Symbologies.Symbology2of5PropertiesChecksum
                        .valueOf(String.valueOf(propertiesHash.get("checksumProperties")));
                props = sp;
            } else if (symbology.equals("SymbologyType_IATA2of5")) {
                Symbologies.IATA2of5Properties sp = new Symbologies.IATA2of5Properties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                sp.checksumProperties = Symbologies.Symbology2of5PropertiesChecksum
                        .valueOf(String.valueOf(propertiesHash.get("checksumProperties")));
                props = sp;
            } else if (symbology.equals("SymbologyType_UPCA")) {
                Symbologies.UPCAProperties sp = new Symbologies.UPCAProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                sp.convertToEAN13Enabled = (Boolean) propertiesHash.get("convertToEAN13Enabled");
                sp.stripCheckDigitEnabled = (Boolean) propertiesHash.get("stripCheckDigitEnabled");
                sp.stripUPCASystemNumberDigitEnabled = (Boolean) propertiesHash
                        .get("stripUPCASystemNumberDigitEnabled");

                sp.supplemental2DigitDecodingEnabled = (Boolean) propertiesHash
                        .get("supplemental2DigitDecodingEnabled");
                sp.supplemental5DigitDecodingEnabled = (Boolean) propertiesHash
                        .get("supplemental5DigitDecodingEnabled");

                props = sp;
            } else if (symbology.equals("SymbologyType_Code11")) {
                Symbologies.Code11Properties sp = new Symbologies.Code11Properties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                sp.checksumProperties = Symbologies.Code11PropertiesChecksum
                        .valueOf(String.valueOf(propertiesHash.get("checksumProperties")));
                sp.stripChecksumDigitsEnabled = (Boolean) propertiesHash.get("stripChecksumDigitsEnabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_CanadaPost")) {
                Symbologies.CanadaPostProperties sp = new Symbologies.CanadaPostProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_USPSIntelligentMail")) {
                Symbologies.USPSIntelligentMailProperties sp = new Symbologies.USPSIntelligentMailProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_USPSPostnet")) {
                Symbologies.USPSPostnetProperties sp = new Symbologies.USPSPostnetProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_DB14")) {
                Symbologies.GS1DataBar14Properties sp = new Symbologies.GS1DataBar14Properties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                sp.ccaDecodingEnabled = (Boolean) propertiesHash.get("ccaDecodingEnabled");
                sp.ccbDecodingEnabled = (Boolean) propertiesHash.get("ccbDecodingEnabled");
                sp.cccDecodingEnabled = (Boolean) propertiesHash.get("cccDecodingEnabled");
                sp.expandedDecodingEnabled = (Boolean) propertiesHash.get("expandedDecodingEnabled");
                sp.expandedStackDecodingEnabled = (Boolean) propertiesHash.get("expandedStackDecodingEnabled");
                sp.limitedDecodingEnabled = (Boolean) propertiesHash.get("limitedDecodingEnabled");
                sp.stackedDecodingEnabled = (Boolean) propertiesHash.get("stackedDecodingEnabled");
                props = sp;
            } // GS1 DATABAR OMNI
            else if (symbology.equals("SymbologyType_RoyalMail")) {
                Symbologies.RoyalMailProperties sp = new Symbologies.RoyalMailProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_GridMatrix")) {
                Symbologies.GridMatrixProperties sp = new Symbologies.GridMatrixProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                sp.mirrorDecodingEnabled = (Boolean) propertiesHash.get("mirrorDecodingEnabled");
                sp.polarity = Symbologies.GridMatrixPropertiesPolarity
                        .valueOf(String.valueOf(propertiesHash.get("polarity")));
                props = sp;
            } else if (symbology.equals("SymbologyType_MPDF")) {
                Symbologies.MicroPDF417Properties sp = new Symbologies.MicroPDF417Properties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_Telepen")) {
                Symbologies.TelepenProperties sp = new Symbologies.TelepenProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_KoreaPost")) {
                Symbologies.KoreaPostProperties sp = new Symbologies.KoreaPostProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_Codabar")) {
                Symbologies.CodabarProperties sp = new Symbologies.CodabarProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                sp.checksumProperties = Symbologies.CodabarPropertiesChecksum
                        .valueOf(String.valueOf(propertiesHash.get("checksumProperties")));
                sp.stripStartStopCharactersEnabled = (Boolean) propertiesHash.get("stripStartStopCharactersEnabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_DutchPost")) {
                Symbologies.DutchPostProperties sp = new Symbologies.DutchPostProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_Matrix2of5")) {
                Symbologies.Matrix2of5Properties sp = new Symbologies.Matrix2of5Properties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                sp.checksumProperties = Symbologies.Symbology2of5PropertiesChecksum
                        .valueOf(String.valueOf(propertiesHash.get("checksumProperties")));
                props = sp;
            } else if (symbology.equals("SymbologyType_CodablockF")) {
                Symbologies.CodablockFProperties sp = new Symbologies.CodablockFProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_HongKong2of5")) {
                Symbologies.HongKong2of5Properties sp = new Symbologies.HongKong2of5Properties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_Plessy")) {
                Symbologies.PlesseyProperties sp = new Symbologies.PlesseyProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            } else if (symbology.equals("SymbologyType_UPU")) {
                Symbologies.UPUProperties sp = new Symbologies.UPUProperties();
                sp.enabled = (Boolean) propertiesHash.get("enabled");
                props = sp;
            }

            props.saveProperties();
        } catch (JSONException ex) {
            Log.e(TAG, ex.getMessage());
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
        }
    }

    private SymbologyProperties getPropsFromJSON(JSONArray jsonprops) {
        return null;
    }

    private void setCameraButtons(JSONArray buttons) {
        this.mCameraButtons = new ArrayList<CameraButtons>();
        try {
            for (int i = 0; i < buttons.length(); i++) {
                JSONObject obj = buttons.getJSONObject(i);
                this.mCameraButtons
                        .add(new CameraButtons(obj.getInt("index"), obj.getInt("func"), obj.getInt("icon"), null));
            }
        } catch (JSONException ex) {
            mDecodeCallbackContext.error(ex.getMessage());
        }
    }

    private void toggleCamera() {
        int cameraidx = 0;
        ArrayList cameraTypes = mCaptureID.getSupportedCameraTypes();
        if (cameraTypes.size() > 1) {
            cameraidx = cameraidx < cameraTypes.size() - 1 ? cameraidx + 1 : 0;
            mCaptureID.setCameraType(cameraTypes.get(cameraidx).toString());
        } else {
            Log.e(TAG, "Can't toogle Camera, only one Camera is supported");
        }
    }

    private void enableNativeZoom(boolean enable) {
        this.mNativeZoom = enable;
    }

    private void showCrossHair(boolean show) {
        this.mShowCrossHair = show;
    }

    public void setLogMode(boolean enable) {
        this.mLogMode = enable;
    }

    private Object parse(JSONArray args, final String key, int type) {
        try {
            for (int i = 0; i < args.length(); i++) {
                JSONObject obj = args.getJSONObject(i);
                switch (type) {
                case 1:
                    return obj.getString(key);
                case 2:
                    return obj.getInt(key);
                case 3:
                    return obj.getBoolean(key);
                case 4:
                    return obj.getDouble(key);
                case 5:
                    return obj.getLong(key);
                }
            }
        } catch (JSONException ex) {
            mLicenseCallbackContext.error(ex.getMessage());
        }
        return "";
    }

    private com.codecorp.decoder.CortexDecoderLibrary callObj(com.codecorp.decoder.CortexDecoderLibrary object) {
        return object;
    }

    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final PluginResult result;
        final PluginResultObject res = new PluginResultObject(action);
        Log.d(TAG, "calling " + action);

        switch (funcs.indexOf(action) + 1) {
        case 1:
            this.mLicenseCallbackContext = callbackContext;
            this.activateLicense((String) this.parse(args, "productKey", STRINGVALUE));
            break;
        case 2:
            this.captureCurrentImageInBuffer();
            break;
        case 3:
            this.changeBeepPlayerSound((String) this.parse(args, "name", STRINGVALUE));
            break;
        case 4:
            this.closeCamera();
            break;
        case 5:
            this.closeSharedObject();
            break;
        case 6:
            if (this.mLogMode) {
                // com.code.cortexdecoder.CortexDecoderLibrary.CRD_Set();
            } else {
                // com.codecorp.decoder.CortexDecoderLibrary.CRD_Set();
            }
            break;
        case 7:
            res.getObjValue().add(this.currentSizeOfDecoderVideo());
            break;
        case 8:
            this.decoderTimeLimitInMilliseconds((Integer) this.parse(args, "milliseconds", INTEGERVALUE));
            break;
        case 9:
            res.setStringValue(this.decoderVersion());
            break;
        case 10:
            res.setStringValue(this.decoderVersionLevel());
            break;
        case 11:
            // this.doDecode();
            break;
        case 12:
            this.enableBeepPlayer((Boolean) this.parse(args, "enable", BOOLEANVALUE));
            break;
        case 13:
            this.enableFixedExposureMode((Boolean) this.parse(args, "enabled", BOOLEANVALUE),
                    (Long) this.parse(args, "exposureValue", LONGVALUE));
            break;
        case 14:
            this.enableScannedImageCapture((Boolean) this.parse(args, "enable", BOOLEANVALUE));
            break;
        case 15:
            this.enableVibrateOnScan((Boolean) this.parse(args, "enable", BOOLEANVALUE));
            break;
        case 16:
            this.ensureRegionOfInterest((Boolean) this.parse(args, "enable", BOOLEANVALUE));
            break;
        case 17:
            this.generateDeviceID();
            break;
        case 18:
            res.getObjValue().add(this.getCameraPreview());
            break;
        case 19:
            res.setIntValue(this.getDecodeVal());
            break;
        case 20:
            // res.getObjValue().add(this.getFixedExposureTime());
            res.setLongValue(this.getFixedExposureTime());
            break;
        case 21:
            res.getObjValue().add(this.getFocusDistance());
            break;
        case 22:
            res.getObjValue().add(this.getLicensedSymbologies());
            break;
        case 23:
            res.setFloatValue(Double.valueOf(this.getMaxZoom()));
            break;
        case 24:
            res.setStringValue(this.getSdkVersion());
            break;
        case 25:
            res.getObjValue().add(this.getSensitivityBoost());
            break;
        case 26:
            res.getObjValue().add(this.getSizeForROI());
            break;
        case 27:
            res.getObjValue().add(this.getSupportedCameraTypes());
            break;
        case 28:
            res.getObjValue().add(this.getSupportedFocusModes());
            break;
        case 29:
            res.getObjValue().add(this.getSupportedWhiteBalance());
            break;
        case 30:
            res.getObjValue().add(this.getZoomRatios());
            break;
        case 31:
            res.setBoolValue(this.hasTorch());
            break;
        case 32:
            res.setBoolValue(this.isLicenseActivated());
            break;
        case 33:
            res.setBoolValue(this.isLicenseExpired());
            break;
        case 34:
            res.setBoolValue(this.isZoomSupported());
            break;
        case 35:
            res.setStringValue(this.libraryVersion());
            break;
        case 36:
            this.loadLicenseFile((String) this.parse(args, "fileContent", STRINGVALUE));
            break;
        case 37:
            this.lowContrastDecodingEnabled((Boolean) this.parse(args, "enabled", BOOLEANVALUE));
            break;
        case 38:
            this.playBeepSound();
            break;
        case 39:
            this.regionOfInterestHeight((Integer) this.parse(args, "roiHeight", INTEGERVALUE));
            break;
        case 40:
            this.regionOfInterestLeft((Integer) this.parse(args, "column", INTEGERVALUE));
            break;
        case 41:
            this.regionOfInterestTop((Integer) this.parse(args, "row", INTEGERVALUE));
            break;
        case 42:
            this.regionOfInterestWidth((Integer) this.parse(args, "roiWidth", INTEGERVALUE));
            break;
        case 43:
            this.setAutoFocusResetByCount((Boolean) this.parse(args, "mEnabled", BOOLEANVALUE));
            break;
        case 45:
            res.setBoolValue(this.setCameraType((String) this.parse(args, "cameraType", STRINGVALUE)));
            break;
        case 46:
            this.setCameraZoom((Boolean) this.parse(args, "enabled", BOOLEANVALUE),
                    ((Double) this.parse(args, "zoom", DOUBLEVALUE)).floatValue());
            break;
        case 47:
            this.setDecoderResolution((String) this.parse(args, "resolution", STRINGVALUE));
            break;
        case 48:
            this.setDecoderToleranceLevel((Integer) this.parse(args, "toleranceLevel", INTEGERVALUE));
            break;
        case 49:
            this.setEncodingCharsetName((String) this.parse(args, "charsetName", STRINGVALUE));
            break;
        case 50:
            this.setExactlyNBarcodes((Boolean) this.parse(args, "enable", BOOLEANVALUE));
            break;
        case 51:
            this.setExposureSensitivity((String) this.parse(args, "iso", STRINGVALUE));
            break;
        case 52:
            this.setFixedExposureTime((Long) this.parse(args, "ep", LONGVALUE));
            break;
        case 53:
            res.setBoolValue(this.setFocus((String) this.parse(args, "focus", STRINGVALUE)));
            break;
        case 54:
            this.setFocusDistance(((Double) this.parse(args, "distance", DOUBLEVALUE)).floatValue());
            break;
        case 56:
            this.mDecodeCallbackContext = callbackContext;
            this.setNumberOfBarcodesToDecode((Integer) this.parse(args, "num", INTEGERVALUE));
            break;
        case 57:
            this.mDecodeCallbackContext = callbackContext;
            this.setTorch((Boolean) this.parse(args, "on", BOOLEANVALUE));
            break;
        case 58:
            this.setWhiteBalance((Boolean) this.parse(args, "enable", BOOLEANVALUE),
                    (String) this.parse(args, "mBalance", STRINGVALUE));
            break;
        case 60:
            this.mDecodeCallbackContext = callbackContext;
            this.startCameraPreview();
            break;
        case 61:
            this.mDecodeCallbackContext = callbackContext;
            this.startDecoding();
            return true;
        case 62:
            this.mDecodeCallbackContext = callbackContext;
            this.stopCameraPreview();
            break;
        case 63:
            this.mDecodeCallbackContext = callbackContext;
            this.stopDecoding();
            break;
        case 64:
            res.setStringValue(this.stringFromSymbologyType((String) this.parse(args, "type", STRINGVALUE)));
            break;
        case 65:
            this.mDecodeCallbackContext = callbackContext;
            this.mCaptureID.setSymbologyProperties(args);
            // this.setSymbologyProperties(args);
            break;
        case 66:
            this.mDecodeCallbackContext = callbackContext;
            this.setCameraButtons(args);
            break;
        case 67:
            this.mDecodeCallbackContext = callbackContext;
            this.showCrossHair((Boolean) this.parse(args, "show", BOOLEANVALUE));
            break;
        case 68:
            this.mDecodeCallbackContext = callbackContext;
            this.toggleCamera();
            break;
        case 69:
            this.enableNativeZoom((Boolean) this.parse(args, "enable", BOOLEANVALUE));
            break;
        case 70:
            // enableSeekBarZoom
            break;
        case 71:
            // enableAugmentedReality
            this.mCaptureID.enableAugmentedReality((Boolean) this.parse(args, "enable", BOOLEANVALUE));
            break;
        case 72:
            // ar_showVisualizeBarcodes
            this.mCaptureID.ar_showVisualizeBarcodes((Boolean) this.parse(args, "enable", BOOLEANVALUE));
            break;
        case 73:
            // ar_detectBarcode
            this.mCaptureID.ar_detectBarcode(new String[] { (String) this.parse(args, "data", STRINGVALUE) });
            break;
        case 74:
            // ar_showDetails
            this.mCaptureID.ar_showDetails((String) this.parse(args, "html", STRINGVALUE));
            break;
        case 75:
            // enableAllDecoders
            this.mCaptureID.enableAllDecoders((Boolean) this.parse(args, "enable", BOOLEANVALUE));
            break;
        case 76:
            // activateEDK
            this.mLicenseCallbackContext = callbackContext;
            JSONObject obj = args.getJSONObject(0);
            String filename = obj.getString("mFileName");
            String customerID = obj.getString("mCustomerID");
            this.activateEDKLicense(filename, customerID);
            break;
        case 77:
            // initCaptureID
            this.initCaptureIDCAllbackContext = callbackContext;
            JSONObject initObj = args.getJSONObject(0);
            String message = initObj.getString("message");
            Boolean showMessageBox = initObj.getBoolean("showTextMessage");
            initCaptureID(message, showMessageBox);
            return true;
        case 78:
            // iOS_showAppSettings
            Log.d(TAG, "Function \"iOS_showAppSettings\"is not supported in Android");
            res.setStringValue("Function is not supported in Android");
            result = new PluginResult(PluginResult.Status.ERROR, res.toJSON());
            callbackContext.sendPluginResult(result);
            return true;
        }
        result = new PluginResult(PluginResult.Status.OK, res.toJSON());
        result.setKeepCallback(true);
        callbackContext.sendPluginResult(result);
        return true;
    }

    private CallbackContext initCaptureIDCAllbackContext;

    private void initCaptureID(String message, Boolean showMessageBox) {
        if (!hasPermissions()) {
            Log.d(TAG, "App needs permissions");
            if (showMessageBox) {
                if (message == null && !message.equals("")) {
                    Log.e(TAG, "initCaptureID - If you want to request permissions, you need to set the message.");
                    return;
                }
                AlertDialog.Builder ab = new AlertDialog.Builder(this.cordova.getActivity());
                ab.setCancelable(false).setMessage(message)
                        .setNeutralButton("Okay", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                                requestPermissions();
                            }
                        }).show();
            } else {
                requestPermissions();
            }
        } else {
            Log.d(TAG, "App has permissions");
            this.buildCaptureID();
        }
    }

    private void buildCaptureID() {
        Log.d(TAG, "init CaptureID");
        this.mCaptureID = new CaptureID(cordova.getActivity());
        if (mCaptureID.isZoomSupported()) {
            float[] ratios = mCaptureID.getZoomRatios();
            this.mMinZoom = ratios[0];
            this.mMaxZoom = ratios[ratios.length - 1];
            this.mCurrentZoom = this.mMinZoom;
        }
        PluginResultObject res = new PluginResultObject("initCaptureID");
        res.setBoolValue(true);
        this.initCaptureIDCAllbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, res.toJSON()));
    }

    private boolean hasPermissions() {
        boolean result;
        for (String value : PERMISSIONS) {
            result = this.cordova.hasPermission(value);
            if (result == false) {
                return false;
            }
        }
        return true;
    }

    private void requestPermissions() {
        boolean result;
        for (String value : PERMISSIONS) {
            result = this.cordova.hasPermission(value);
            if (result == false) {
                this.cordova.requestPermissions(this, 8554, PERMISSIONS);
                return;
            }
        }
    }

    @Override
    public void onRequestPermissionResult(int requestCode, String[] permissions, int[] grantResults)
            throws JSONException {
        Log.d(TAG, "permissionsResult");
        if (requestCode == 8554) {
            Log.d(TAG, "get the right requestcode");
        }
        for (int r : grantResults) {
            Log.d(TAG, "Permission " + r);
        }

        boolean result;
        for (String value : PERMISSIONS) {
            result = this.cordova.hasPermission(value);
            if (result == false) {
                PluginResultObject res = new PluginResultObject("initCaptureID");
                res.setBoolValue(false);
                res.setStringValue("We need the permission = " + value);
                this.initCaptureIDCAllbackContext.sendPluginResult(new PluginResult(Status.ERROR, res.toJSON()));
                return;
            }
        }
        this.buildCaptureID();
    }

    private void saveEDKSettings(String filename, String customerID) {
        this.saveSettings(CaptureIDSharedPrefsKey.KEY_FILE_NAME, filename);
        this.saveSettings(CaptureIDSharedPrefsKey.KEY_CUSTOMER_ID, customerID);
        this.saveSettings(CaptureIDSharedPrefsKey.KEY_TYPE, CaptureIDLicenseType.EDK.getValue());
        // clear SDK
        this.saveSettings(CaptureIDSharedPrefsKey.KEY_DATA, "");
    }

    private void saveSDKSettings(String productKey) {
        this.saveSettings(CaptureIDSharedPrefsKey.KEY_DATA, productKey);
        this.saveSettings(CaptureIDSharedPrefsKey.KEY_TYPE, CaptureIDLicenseType.SDK.getValue());
        // clear EDK
        this.saveSettings(CaptureIDSharedPrefsKey.KEY_FILE_NAME, "");
        this.saveSettings(CaptureIDSharedPrefsKey.KEY_CUSTOMER_ID, "");
    }

    /**
     * Save the KeyType, Key-Data, keyFilename and the CustomerID in the SharedPrefs
     *
     * @param key   [String]
     * @param value [String]
     */
    private void saveSettings(CaptureIDSharedPrefsKey key, String value) {
        SharedPreferences.Editor editor = cordova.getActivity()
                .getSharedPreferences(sharedPrefsName, Context.MODE_PRIVATE).edit();
        editor.putString(key.getValue(), value);
        editor.apply();
    }

    /**
     * Read the KeyType, Key-Data, keyFilename and the CustomerID from the
     * SharedPrefs
     *
     * @param key
     * @return [String]
     */
    private String readSettings(CaptureIDSharedPrefsKey key) {
        SharedPreferences prefs = cordova.getActivity().getSharedPreferences(sharedPrefsName, Context.MODE_PRIVATE);
        String result = prefs.getString(key.getValue(), "");
        return result;
    }
}