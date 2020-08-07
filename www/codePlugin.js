
/**
 * @fileOverview Cordova Plugin:  Wrapper for Cortex Decoder Library.
 * This plugin requires valid Cortex Decoder Library License Key(s)
 * @author Christian Jung <c.jung@p4it.de>
 * @author Uwe Hoppe <u.hoppe@p4it.de>
 * @version 1.0.8
 */

var exec = require('cordova/exec');
var argscheck = require('cordova/argscheck');
var PLUGIN_NAME = 'Cortex Plugin';

/** 
 * 
 * @class
 * All member function will return it's results via the callback function referred in the first parameter.
 * The second (optional)parameter references a callback function that will be fired in case of an error.   
 */
function CortexDecoderLibrary() {
  /**@constant Resolution */
  CortexDecoderLibrary.prototype.Resolution_1280x720 = "Resolution_1280x720";
  CortexDecoderLibrary.prototype.Resolution_1920x1080 = "Resolution_1920x1080";
  CortexDecoderLibrary.prototype.Resolution_352x288 = "Resolution_352x288";
  CortexDecoderLibrary.prototype.Resolution_640x480 = "Resolution_640x480";

  /**@constant Camera Type */
  CortexDecoderLibrary.prototype.CameraType_BackFacing = "BackFacing";
  CortexDecoderLibrary.prototype.CameraType_FrontFacing = "FrontFacing";

  /**@constant Focus */
  CortexDecoderLibrary.prototype.Focus_Far = "Focus_Far";
  CortexDecoderLibrary.prototype.Focus_Fix_Far = "Focus_Fix_Far";
  CortexDecoderLibrary.prototype.Focus_Fix_Normal = "Focus_Fix_Normal";
  CortexDecoderLibrary.prototype.Focus_Normal = "Focus_Normal";

  /**
   * Activating a license for the native Cortex Decoder Library. For security purposes we recommend to place the License Key in your projects config.xml file
   * @version 1.0.0
   * @param {string} productKey Valid License Key or emty String.
   * @returns {boolean}
   */
  CortexDecoderLibrary.prototype.activateLicense = function (successCallback, errorCallback, productKey) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.activateLicense failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.activateLicense failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'activateLicense', [{ productKey }]);
  };

  /**
   * This method will capture the current image in the buffer and store it in the camera roll.
   * @version 1.0.0
   * @returns {boolean}
   */
  CortexDecoderLibrary.prototype.captureCurrentImageInBuffer = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.captureCurrentImageInBuffer failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.captureCurrentImageInBuffer failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'captureCurrentImageInBuffer', [{}]);
  };

  /**
   * Allows the user to change the beep noise.
   * @version 1.0.0
   * @param {string} name  Enter the number as a string to trigger the change of the beep sound. "1" = Default Beep "2" = Carbilicon Beep "3" = Computer Beep "4" = Tone Beep.
   * @default default is 1.
   */
  CortexDecoderLibrary.prototype.changeBeepPlayerSound = function (successCallback, errorCallback, name) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.changeBeepPlayerSound failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.changeBeepPlayerSound failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'changeBeepPlayerSound', [{ name }]);
  };

  /**
   * Closes the camera.
   * @version 1.0.0
   */
  CortexDecoderLibrary.prototype.closeCamera = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.closeCamera failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.closeCamera failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'closeCamera', [{}]);
  };

  /**
   * Close the singleton object returned by #sharedObject(Context), stop the decoder, stop the camera preview, close the camera, and stop all background threads.  
   * @version 1.0.0
   */
  CortexDecoderLibrary.prototype.closeSharedObject = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.closeSharedObject failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.closeSharedObject failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'closeSharedObject', [{}]);
  };

  /**
   * @version 1.0.0
   * @param {int} property
   * @param {any} value Boolean, ByteBuffer or int.
   */
  CortexDecoderLibrary.prototype.CRD_Set = function (successCallback, errorCallback, property, value) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.CRD_Set failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.CRD_Set failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'CRD_Set', [{ property, value }]);
  };

  /**
   * Returns the current size of the camera image sent to the decoder.
   * @version 1.0.0
   * @returns {Size} Size object containing width and height of the camera image.
   */
  CortexDecoderLibrary.prototype.currentSizeOfDecoderVideo = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.currentSizeOfDecoderVideo failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.currentSizeOfDecoderVideo failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'currentSizeOfDecoderVideo', [{}]);
  };

  /**
   * This method sets a timeout for the decoder for one frame. If this timeout is reached it will start on the next frame if available.
   * @version 1.0.0
   * @param {int} milliseconds This should be a positive integer representing the timeout in milliseconds. If set to 0 no timeout will be used.
   */
  CortexDecoderLibrary.prototype.decoderTimeLimitInMilliseconds = function (successCallback, errorCallback, milliseconds) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.decoderTimeLimitInMilliseconds failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.decoderTimeLimitInMilliseconds failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'decoderTimeLimitInMilliseconds', [{ milliseconds }]);
  };

  /**
   * Returns the CortexDecoder version string.
   * @version 1.0.0
   * @returns {string} A String containing the decoder version.
   */
  CortexDecoderLibrary.prototype.decoderVersion = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.decoderVersion failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.decoderVersion failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'decoderVersion', [{}]);
  };

  /**
   * Returns the CortexDecoder Level string.
   * @version 1.0.0
   * @returns {string} A String containing the level of the decoding capabilities.
   */
  CortexDecoderLibrary.prototype.decoderVersionLevel = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.decoderVersionLevel failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.decoderVersionLevel failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'decoderVersionLevel', [{}]);
  };

  /**
   * This function scans the image and decodes the barcodes present in the image.
   * @version 1.0.0
   * @param {bytearray} pixBuf an Image is converted to a byte buffer so that it can be used by the decoder to decode the barcode
   * @param {int} width the width of the image
   * @param {int} height the height of the image
   * @param {int} stride the stride/width of the image
   */
  CortexDecoderLibrary.prototype.doDecode = function (successCallback, errorCallback, pixBuf, width, height, stride) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.doDecode failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.doDecode failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'doDecode', [{}]);
  };

  /**
   * Enables or disables the beep sound during a successful scan.
   * @version 1.0.0
   * @param {boolean} enable true to enable.
   */
  CortexDecoderLibrary.prototype.enableBeepPlayer = function (successCallback, errorCallback, enable) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.enableBeepPlayer failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.enableBeepPlayer failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'enableBeepPlayer', [{ enable }]);
  };

  /**
   * This method enables fixed exposure mode where user can change the exposure compensation values.
   * @version 1.0.0
   * @param {boolean} enabled If set to true, then fixed exposure mode is enabled.
   * @param {long} exposureValue This should be a Long integer representing the new value for exposure compensation. not supported in version 1.0.25 and above.
   */
  CortexDecoderLibrary.prototype.enableFixedExposureMode = function (successCallback, errorCallback, enabled, exposureValue) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.enableFixedExposureMode failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.enableFixedExposureMode failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'enableFixedExposureMode', [{ enabled, exposureValue }]);
  };

  /**
   * This method enables or disables the capture of the image that was used for decoding the barcode. This method will put the decoder in debug mode, which will result in a loss of performance.
   * @version 1.0.0
   * @param {boolean} enable true to enable.
   */
  CortexDecoderLibrary.prototype.enableScannedImageCapture = function (successCallback, errorCallback, enable) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.enableScannedImageCapture failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.enableScannedImageCapture failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'enableScannedImageCapture', [{ enable }]);
  };

  /**
   * Enables or disables vibrate on successful scan.
   * @version 1.0.0
   * @param {boolean} enable true to enable.
   */
  CortexDecoderLibrary.prototype.enableVibrateOnScan = function (successCallback, errorCallback, enable) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.enableVibrateOnScan failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.enableVibrateOnScan failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'enableVibrateOnScan', [{ enable }]);
  };

  /**
   * Enables or disables strict region of interest (ROI) decoding. When enabled, the barcode will not decoded unless its entire area is inside the ROI. When disabled, the barcode will be decoded if a sufficient portion of the barcode is in the ROI.
   * @version 1.0.0
   * @param {boolean} enable true to enable.
   */
  CortexDecoderLibrary.prototype.ensureRegionOfInterest = function (successCallback, errorCallback, enable) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.ensureRegionOfInterest failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.ensureRegionOfInterest failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'ensureRegionOfInterest', [{ enable }]);
  };

  /**
   * This method is used to generate Device Unique ID.
   * @version 1.0.0
   */
  CortexDecoderLibrary.prototype.generateDeviceID = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.generateDeviceID failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.generateDeviceID failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'generateDeviceID', [{}]);
  };

  /**
   * Returns the View object that will display the live preview images from the camera.
   * @version 1.0.0
   * @returns {View} A View with the live preview.
   */
  CortexDecoderLibrary.prototype.getCameraPreview = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.getCameraPreview failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.getCameraPreview failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'getCameraPreview', [{}]);
  };

  /**
   * Returns the CRD_Decode Value. If the return value is equal to 908 then that means the license has expired.
   * @version 1.0.0
   * @returns {int} An integer representing the state of the deocder.
   */
  CortexDecoderLibrary.prototype.getDecodeVal = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.getDecodeVal failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.getDecodeVal failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'getDecodeVal', [{}]);
  };

  /**
   * This method is used to get the exposure time that the camera supports.
   * @version 1.0.0
   * @returns {long[]} a long array that holds the minimum and maximum exposure time supported by the camera
   */
  CortexDecoderLibrary.prototype.getExposureTime = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.getExposureTime failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.getExposureTime failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'getExposureTime', [{}]);
  };

  /**
   * This method is used to get the minimum focus distance that the object can be focused.
   * @version 1.0.0
   * @returns {float[]} an float array with 0 as the first value and minimum focus distance as second value (for camera2)
   */
  CortexDecoderLibrary.prototype.getFocusDistance = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.getFocusDistance failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.getFocusDistance failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'getFocusDistance', [{}]);
  };

  /**
   * This method returns an array that contains all the licensed symbologies from the decoder.
   * @version 1.0.0
   * @returns {string[]} an string array that holds all licensed symbologies that are supported by the decoder
   */
  CortexDecoderLibrary.prototype.getLicensedSymbologies = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.getLicensedSymbologies failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.getLicensedSymbologies failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'getLicensedSymbologies', [{}]);
  };

  /**
   * This method is used to get the maximum camera zoom that camera supports.
   * @version 1.0.0
   * @returns {float} float that corresponds to maximum zoom value that camera supports.
   */
  CortexDecoderLibrary.prototype.getMaxZoom = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.getMaxZoom failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.getMaxZoom failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'getMaxZoom', [{}]);
  };

  /**
   * Returns the CortexDecoder Level string.
   * @version 1.0.0
   * @returns {string} a string containing the level of the decoding capabilities.
   */
  CortexDecoderLibrary.prototype.getSdkVersion = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.getSdkVersion failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.getSdkVersion failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'getSdkVersion', [{}]);
  };

  /**
   * This method is used to get the sensitivity boost supported by the camera.
   * @version 1.0.0
   * @returns {string[]} an array list that holds all the iso names that are supported by the camera.
   */
  CortexDecoderLibrary.prototype.getSensitivityBoost = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.getSensitivityBoost failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.getSensitivityBoost failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'getSensitivityBoost', [{}]);
  };

  /**
   * Returns the size of the image being sent to the decoder. This could differ slighly from resolution size.
   * @version 1.0.0
   * @returns {Size} 
   */
  CortexDecoderLibrary.prototype.getSizeForROI = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.getSizeForROI failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.getSizeForROI failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'getSizeForROI', [{}]);
  };

  /**
   * Returns an array of the supported camera types.
   * @version 1.0.0
   * @returns {CameraType[]}
   */
  CortexDecoderLibrary.prototype.getSupportedCameraTypes = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.getSupportedCameraTypes failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.getSupportedCameraTypes failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'getSupportedCameraTypes', [{}]);
  };

  /**
   * Returns an array of the supported Focus modes.
   * @version 1.0.0
   * @returns {Focus[]}
   */
  CortexDecoderLibrary.prototype.getSupportedFocusModes = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.getSupportedFocusModes failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.getSupportedFocusModes failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'getSupportedFocusModes', [{}]);
  };

  /**
   * This method is used to get the white balance modes supported by the camera.
   * @version 1.0.0
   * @returns {string[]} a string array that holds all white balance modes that are supported by the camera.
   */
  CortexDecoderLibrary.prototype.getSupportedWhiteBalance = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.getSupportedWhiteBalance failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.getSupportedWhiteBalance failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'getSupportedWhiteBalance', [{}]);
  };

  /**
   * This method is used to get the zoom ratios supported by the camera.
   * @version 1.0.0
   * @returns {float[]} a float array that holds all the zoom ratios that are supported by the camera.
   */
  CortexDecoderLibrary.prototype.getZoomRatios = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.getZoomRatios failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.getZoomRatios failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'getZoomRatios', [{}]);
  };

  /**
   * Returns true if the camera has a torch that can be turned on.
   * @version 1.0.0
   * @returns {boolean}
   */
  CortexDecoderLibrary.prototype.hasTorch = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.hasTorch failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.hasTorch failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'hasTorch', [{}]);
  };

  /**
   * This method is used to check whether license is activated or not.
   * @version 1.0.0
   * @returns {boolean} true if license is activated for the app.
   */
  CortexDecoderLibrary.prototype.isLicenseActivated = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.isLicenseActivated failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.isLicenseActivated failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'isLicenseActivated', null);
  };

  /**
   * Checks whether the license is expired.
   * @version 1.0.0
   * @returns {boolean} true if license is expired.
   */
  CortexDecoderLibrary.prototype.isLicenseExpired = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.isLicenseExpired failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.isLicenseExpired failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'isLicenseExpired', null);
  };

  /**
   * This method is used to know whether the camera supports zoom or not.
   * @version 1.0.0
   * @returns {boolean} true if the camera supports zoom.
   */
  CortexDecoderLibrary.prototype.isZoomSupported = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.isZoomSupported failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.isZoomSupported failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'isZoomSupported', [{}]);
  };

  /**
   * Returns the CortexDecoderLibrary version string.
   * @version 1.0.0
   * @returns {string} a string containing the library version.
   */
  CortexDecoderLibrary.prototype.libraryVersion = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.libraryVersion failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.libraryVersion failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'libraryVersion', [{}]);
  };

  /**
   * This method is used to load the license file, activate the license and load the decoder functions.
   * @version 1.0.0
   * @param {string} fileContent a string that consists the content of the license file obtained License Server.
   */
  CortexDecoderLibrary.prototype.loadLicenseFile = function (successCallback, errorCallback, fileContent) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.loadLicenseFile failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.loadLicenseFile failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'loadLicenseFile', [{ fileContent }]);
  };

  /**
   * This method enables & disables low contrast images of common 1D barcodes: Code 128, Code 39, UPC/EAN/JAN, I 2of 5, Codabar, Code 93. With the low contrast mode enabled, a light on dark (i.e. inverse image) barcode can also be decoded.
   * @version 1.0.0
   * @param {boolean} enabled true to enable.
   */
  CortexDecoderLibrary.prototype.lowContrastDecodingEnabled = function (successCallback, errorCallback, enabled) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.lowContrastDecodingEnabled failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.lowContrastDecodingEnabled failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'lowContrastDecodingEnabled', [{ enabled }]);
  };

  /**
   * This is to manually trigger the beep sound to play.
   * @version 1.0.0
   */
  CortexDecoderLibrary.prototype.playBeepSound = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.playBeepSound failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.playBeepSound failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'playBeepSound', [{}]);
  };

  /**
   * This method sets barcode decoding ROI (Region of Interest). The ROI is a rectangle specified by the position of the top-left corner point and the width and height. By default, the ROI is the entire valid image area. It can be set to a smaller region to speed up the decoding if needed.
   * @version 1.0.0
   * @param {int} roiHeight This is the height of the ROI rectangle. The default value is 0, indicating the full image height is used. Otherwise, roiHeight can be a value up to (imageHeight – roiHeight).
   */
  CortexDecoderLibrary.prototype.regionOfInterestHeight = function (successCallback, errorCallback, roiHeight) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.regionOfInterestHeight failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.regionOfInterestHeight failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'regionOfInterestHeight', [{ roiHeight }]);
  };

  /**
   * This method sets barcode decoding ROI (Region of Interest). The ROI is a rectangle specified by the position of the top-left corner point and the width and height. By default, the ROI is the entire valid image area. It can be set to a smaller region to speed up the decoding if needed.
   * @version 1.0.0
   * @param {int } column This is the x or column coordinate of the ROI upper-left corner. The default value is 0.
   */
  CortexDecoderLibrary.prototype.regionOfInterestLeft = function (successCallback, errorCallback, column) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.regionOfInterestLeft failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.regionOfInterestLeft failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'regionOfInterestLeft', [{ column }]);
  };

  /**
   * This method sets barcode decoding ROI (Region of Interest). The ROI is a rectangle specified by the position of the top-left corner point and the width and height. By default, the ROI is the entire valid image area. It can be set to a smaller region to speed up the decoding if needed.
   * @version 1.0.0
   * @param {int} row This is the y or row coordinate of the ROI top-left corner. The default value is 0.
   */
  CortexDecoderLibrary.prototype.regionOfInterestTop = function (successCallback, errorCallback, row) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.regionOfInterestTop failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.regionOfInterestTop failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'regionOfInterestTop', [{ row }]);
  };

  /**
   * This method sets barcode decoding ROI (Region of Interest). The ROI is a rectangle specified by the position of the top-left corner point and the width and height. By default, the ROI is the entire valid image area. It can be set to a smaller region to speed up the decoding if needed.
   * @version 1.0.0
   * @param {int} roiWidth This is the width of the ROI rectangle. The default value is 0, indicating the full image width is used. Otherwise, roiWidth can be a value up to (imageWidth – roiWidth).
   */
  CortexDecoderLibrary.prototype.regionOfInterestWidth = function (successCallback, errorCallback, roiWidth) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.regionOfInterestWidth failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.regionOfInterestWidth failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'regionOfInterestWidth', [{ roiWidth }]);
  };

  /**
   * A function to enable the camera to always run in autofocus mode when there is no decode for 20 frames.
   * @version 1.0.0
   * @param {boolean} mEnabled if true then autofocus restart every 20 frames of no decode is enabled.
   */
  CortexDecoderLibrary.prototype.setAutoFocusResetByCount = function (successCallback, errorCallback, mEnabled) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.setAutoFocusResetByCount failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.setAutoFocusResetByCount failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'setAutoFocusResetByCount', [{ mEnabled }]);
  };

  /**
   * Sets the camera type.
   * @version 1.0.0
   * @param {CamerType} cameraType
   * @returns {boolean}
   */
  CortexDecoderLibrary.prototype.setCameraType = function (successCallback, errorCallback, cameraType) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.setCameraType failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.setCameraType failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'setCameraType', [{ cameraType }]);
  };

  /**
   * This method is used to set the camera zoom to a certain value when the camera zoom customization is enabled.
   * @version 1.0.0
   * @param {boolean} enabled true to enable the feature.
   * @param {float} zoom float value that specifies the zoom value that camera should use.
   */
  CortexDecoderLibrary.prototype.setCameraZoom = function (successCallback, errorCallback, enabled, zoom) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.setCameraZoom failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.setCameraZoom failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'setCameraZoom', [{ enabled, zoom }]);
  };

  /**
   * This method sets the active resolution mode.
   * @version 1.0.0
   * @param {Resolution} resolution Resolution to use for decoding.
   */
  CortexDecoderLibrary.prototype.setDecoderResolution = function (successCallback, errorCallback, resolution) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.setDecoderResolution failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.setDecoderResolution failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'setDecoderResolution', [{ resolution }]);
  };

  /**
   * Set the tolerance level to value from 0 thru 10. 0 means the target pointer has to be inside the barcode box for it to decode. Values 1 thru 9 expand the box by N times half of the barcode height in all four directions. Setting value to 10 means infinite tolerance. So when enabling picklist mode use value of either 0 or 1 and when disabling Pick list mode (default) use value of 10.
   * @version 1.0.0
   * @param {int} toleranceLevel sets the tolerance level.
   */
  CortexDecoderLibrary.prototype.setDecoderToleranceLevel = function (successCallback, errorCallback, toleranceLevel) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.setDecoderToleranceLevel failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.setDecoderToleranceLevel failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'setDecoderToleranceLevel', [{ toleranceLevel }]);
  };

  /**
   * This method sets the charset to be used when encoding decoded barcode data.
   * @version 1.0.0
   * @param {string} charsetName Charset to use for encoding barcode data.
   */
  CortexDecoderLibrary.prototype.setEncodingCharsetName = function (successCallback, errorCallback, charsetName) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.setEncodingCharsetName failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.setEncodingCharsetName failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'setEncodingCharsetName', [{ charsetName }]);
  };

  /**
   * If the value [enable] is true, the decoder wait for the exact amount of barcodes (n) that we defined in [setNumberOfBarcodesToDecode].
   * @version 1.0.0
   * @param {boolean} enable
   */
  CortexDecoderLibrary.prototype.setExactlyNBarcodes = function (successCallback, errorCallback, enable) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.setExactlyNBarcodes failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.setExactlyNBarcodes failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'setExactlyNBarcodes', [{ enable }]);
  };

  /**
   * This method is used to set the exposure senstivity.
   * @version 1.0.0
   * @param {string} iso sets the exposure sensitivity to ep.
   */
  CortexDecoderLibrary.prototype.setExposureSensitivity = function (successCallback, errorCallback, iso) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.setExposureSensitivity failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.setExposureSensitivity failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'setExposureSensitivity', [{ iso }]);
  };

  /**
   * This method is used to set the exposure time when Manual exposure mode is enabled.
   * @version 1.0.0
   * @param {long} ep sets the exposure time to ep.
   */
  CortexDecoderLibrary.prototype.setExposureTime = function (successCallback, errorCallback, ep) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.setExposureTime failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.setExposureTime failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'setExposureTime', [{ ep }]);
  };

  /**
   * This method sets the focus mode.
   * @version 1.0.0
   * @param {Focus} focus Focus mode is set to focus.
   * @returns {boolean} true if focus is set successfully.
   */
  CortexDecoderLibrary.prototype.setFocus = function (successCallback, errorCallback, focus) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.setFocus failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.setFocus failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'setFocus', [{ focus }]);
  };

  /**
   * This method is used to set the focus distance when fixed focus mode is enabled.
   * @version 1.0.0
   * @param {float} distance sets the focus distance to distance.
   */
  CortexDecoderLibrary.prototype.setFocusDistance = function (successCallback, errorCallback, distance) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.setFocusDistance failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.setFocusDistance failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'setFocusDistance', [{ distance }]);
  };

  /**
   * By default the number of barcodes to decode is 1 and the maximum is 20 at once. Call this function to change the amount of barcodes to decode between 1 and 20.
   * @version 1.0.0
   * @param {int} num
   */
  CortexDecoderLibrary.prototype.setNumberOfBarcodesToDecode = function (successCallback, errorCallback, num) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.setNumberOfBarcodesToDecode failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.setNumberOfBarcodesToDecode failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'setNumberOfBarcodesToDecode', [{ num }]);
  };

  /**
   * This method turns the camera's torch on or off, if the camera supports it. if hasTorch() returns false, then the camera does not have a torch.
   * @version 1.0.0
   * @param {boolean} on whether to turn on torch.
   */
  CortexDecoderLibrary.prototype.setTorch = function (successCallback, errorCallback, on) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.setTorch failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.setTorch failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'setTorch', [{ on }]);
  };

  /**
   * This method is used to set the white balance mode to the camera when white balance customization is enabled.
   * @version 1.0.0
   * @param {boolean} enable is true then thsi feature is enabled.
   * @param {string} mBalance sets the white balance mode if enable is true.
   */
  CortexDecoderLibrary.prototype.setWhiteBalance = function (successCallback, errorCallback, enable, mBalance) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.setWhiteBalance failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.setWhiteBalance failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'setWhiteBalance', [{ enable, mBalance }]);
  };

  /**
   * Starts the camera preview. This method opens the camera device if it is not already open.
   * @version 1.0.0
   */
  CortexDecoderLibrary.prototype.startCameraPreview = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.startCameraPreview failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.startCameraPreview failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'startCameraPreview', [{}]);
  };

  /**
   * Starts the decoder's search for a valid barcode. Camera preview will be started if it has not already been started.
   * @version 1.0.0
   */
  CortexDecoderLibrary.prototype.startDecoding = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.startDecoding failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.startDecoding failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'startDecoding', [{}]);
  };

  /**
   * Stops the camera preview.
   * @version 1.0.0
   */
  CortexDecoderLibrary.prototype.stopCameraPreview = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.stopCameraPreview failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.stopCameraPreview failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'stopCameraPreview', [{}]);
  };

  /**
   * Stops the decoder's barcode search, but not the camera preview. To stop the camera preview, call stopCameraPreview().
   * @version 1.0.0
   */
  CortexDecoderLibrary.prototype.stopDecoding = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.stopDecoding failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.stopDecoding failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'stopDecoding', [{}]);
  };

  /**
   * This method translates a SymbologyType type to a String.
   * @version 1.0.0
   * @param {SymbologyType} type The SymbologyType that you want returned as a string.
   * @returns {string} a string representing the SymbologyType passed to the method.
   */
  CortexDecoderLibrary.prototype.stringFromSymbologyType = function (successCallback, errorCallback, type) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.stringFromSymbologyType failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.stringFromSymbologyType failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'stringFromSymbologyType', [{}]);
  };

  CortexDecoderLibrary.prototype.CameraTypeValueOf = function (successCallback, errorCallback, name) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.CameraTypeValueOf failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.CameraTypeValueOf failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'CameraTypeValueOf', [{ name }]);
  };

  CortexDecoderLibrary.prototype.CameraTypeValues = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.CameraTypeValues failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.CameraTypeValues failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'CameraTypeValues', [{}]);
  };

  CortexDecoderLibrary.prototype.FocusValueOf = function (successCallback, errorCallback, name) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.CameraTypeValueOf failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.CameraTypeValueOf failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'FocusValueOf', [{ name }]);
  };

  CortexDecoderLibrary.prototype.FocusValues = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.CameraTypeValues failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.CameraTypeValues failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'FocusValues', [{}]);
  };

  CortexDecoderLibrary.prototype.SymbologyTypeValueOf = function (successCallback, errorCallback, name) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.CameraTypeValueOf failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.CameraTypeValueOf failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'SymbologyTypeValueOf', [{ name }]);
  };

  CortexDecoderLibrary.prototype.SymbologyTypeValues = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.CameraTypeValues failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.CameraTypeValues failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'SymbologyTypeValues', [{}]);
  };

  /**
   * Set the properties for a particular symbology.  
   * @version 1.0.0
   * @param {string} symbology
   * @param {SymbologyProperties} props
   * 
   */
  CortexDecoderLibrary.prototype.setSymbologyProperties = function (successCallback, errorCallback, symbology, props) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.setSymbologyProperties failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.setSymbologyProperties failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'setSymbologyProperties', [{ symbology }, props]);
  };

  /**
   * add an array of camera buttons to the camera preview window.   
   * @version 1.0.0
   * @param {camerabuttons[]} camerabuttons
   */
  CortexDecoderLibrary.prototype.setCameraButtons = function (successCallback, errorCallback, camerabuttons) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.setCameraButtons failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.setCameraButtons failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'setCameraButtons', camerabuttons);
  };

  /**
   * show/hide aiming cross in camera preview  
   * @version 1.0.0 
   * @param {boolean} show
   */
  CortexDecoderLibrary.prototype.showCrossHair = function (successCallback, errorCallback, show) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.showCrossHair failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.showCrossHair failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'showCrossHair', [{ show }]);
  };

  /**
   * toggles the camera preview between the camera types supported by your device.
   * @version 1.0.0
   */
  CortexDecoderLibrary.prototype.toggleCamera = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.toggleCamera failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.toggleCamera failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'toggleCamera');
  };

  /**
   * enable/disable zoom in camera preview. This will change the zoom factor in supported range the camera provides.  
   * @version 1.0.0
   * @param {boolean} enable
   */
  CortexDecoderLibrary.prototype.enableNativeZoom = function (successCallback, errorCallback, enable) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.enableNativeZoom failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.enableNativeZoom failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'enableNativeZoom', [{ enable }]);
  };

  /**
   * enable/disable zoom in camera preview. this will change the zoom factor in supported range the camera provides.  
   * @version 1.0.0
   * @param {boolean} enable
   */
  CortexDecoderLibrary.prototype.enableSeekBarZoom = function (successCallback, errorCallback, enable) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.enableSeekBarZoom failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.enableSeekBarZoom failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'enableSeekBarZoom', [{ enable }]);
  };

  /**
   * Enable or disable the augmented reality
   * If enabled you can use the additional functions starting with ar_xxx. 
   * @version 1.0.0
   * @param {boolean} enable
   */
  CortexDecoderLibrary.prototype.enableAugmentedReality = function (successCallback, errorCallback, enable) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.enableAugmentedReality failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.enableAugmentedReality failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'enableAugmentedReality', [{ enable }]);
  }

  /**
   * Enable/disable show/hide visualized barcode detection
   * if true barcodes are visualized on the overlay.
   * Requires augmented reality support enabled. 
   * @version 1.0.0
   * @param {boolean} enable
   */
  CortexDecoderLibrary.prototype.ar_showVisualizeBarcodes = function (successCallback, errorCallback, enable) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.ar_showVisualizeBarcodes failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.ar_showVisualizeBarcodes failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'ar_showVisualizeBarcodes', [{ enable }]);
  }

  /**
   * If decoded barcode equals the given parameter it draw´s the rectangle around the barcode in green color. 
   * only available if augmented reality support and barcode vissualization are enabled.
   * @version 1.0.0
   * @param {string} data the data to compare the barcode with. 
   */
  CortexDecoderLibrary.prototype.ar_detectBarcode = function (successCallback, errorCallback, data) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.ar_detectBarcode failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.ar_detectBarcode failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'ar_detectBarcode', [{ data }]);
  }

  /**
   * Displays info field on camera overlay with the given html data. 
   * only available if augmented reality support is enabled.
   * @version 1.0.0
   * @param {string} html the html code that get displayed.
   */
  CortexDecoderLibrary.prototype.ar_showDetails = function (successCallback, errorCallback, html) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.ar_showDetails failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.ar_showDetails failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'ar_showDetails', [{ html }]);
  }

  /**
   * Enables or disables all symbologies.
   * If a symbology is disabled, the decoder cant decode a barcode with the given symbology.
   * @version 1.0.1
   * @param {boolean} enable 
   */
  CortexDecoderLibrary.prototype.enableAllDecoders = function (successCallback, errorCallback, enable) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.enableAllDecoders failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.enableAllDecoders failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'enableAllDecoders', [{ enable }]);
  }

  /**
     * This method is only for iOS. On Android you can use the activateLicense method.
     * @version 1.0.1
     * @param {string} mFileName filename for the mainbundle in iOS
     * @param {string} mCustomerID is required for the EDK activation.
     */
  CortexDecoderLibrary.prototype.activateEDKLicense = function (successCallback, errorCallback, mFileName, mCustomerID) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.activateEDKLicense failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.activateEDKLicense failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'activateEDKLicense', [{ mFileName, mCustomerID }]);
  };

  /**
       * This method initialise the CaptureID Plugin and ask for runtimepermissions on Android and the permission on iOS 
       * @version 1.0.8
       * @param {string} message that get displayed inside of the Messagebox(Android-only)
       * @param {boolean} showTextMessage show the AlertDialog (Android-only)
       */
  CortexDecoderLibrary.prototype.initCaptureID = function (successCallback, errorCallback, message, showTextMessage) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.initCaptureID failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.initCaptureID failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'initCaptureID', [{ message, showTextMessage }]);
  };

  /**
   * Only iOS
   * On iOS the decive start the App settings. 
   */
  CortexDecoderLibrary.prototype.iOS_showAppSettings = function (successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function () { }; }
    if (typeof errorCallback != "function") { console.log("CortexDecoderLibrary.initCaptureID failure: failure parameter not a function"); return; }
    if (typeof successCallback != "function") { console.log("CortexDecoderLibrary.initCaptureID failure: success callback parameter must be a function"); return; }

    exec(successCallback, errorCallback, 'CaptureIDDecoder', 'iOS_showAppSettings');
  };


}
var cortexdecoder = new CortexDecoderLibrary();
module.exports = cortexdecoder;