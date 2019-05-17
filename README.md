[![appcenterbanner](https://www.retail-world.de/cordova-plugin-cortex-decode.png)](https://www.p4it.de/cortex/)

# Apache Cordova Plugin for Cortex Decoder

This plugin provides the ability to use the Cortex Decoder Engine to easily build highly performant Barcode scanning app(s).

<!-- Cordova Catelog -->

* [Requirements](#requirements)
* [Supported Cordova Platforms](#supported-cordova-platforms)
* [How does it work?](#how-does-it-work)
* [Getting Started](#getting-started)
* [Plugin Usage](#plugin-usage)
* [API Reference](#api-reference)
* [PhoneGap Build](#phonegap-build)
* [Example Apps](#example-apps)

<!-- Cordova Catelog -->

## Requirements

The Cortex Decoder plugin requires a valid license key for the native Cortex Decoder Library. This license must be purchased separatly and is not included in this package. For additional Information of the Cortex Decoder Library and how to get access to a valid license Key visit our Website under (https://www.p4it.de/cortexdecoder). 

## Supported Cordova Platforms

Cordova 8.0.0+ is fully supported, along with the following asociated platforms:

* Android ([cordova-android](https://github.com/apache/cordova-android) 7.0.0+) 

To check which versions of each Cordova platform you are currently using, you can run the following command and inspect the `Installed platforms` list:

```shell
cordova platform ls
```

If you're running an older Android and/or iOS platform than is mentioned above, and would be open to upgrading, you can easily do so by running the following commands (omitting a platform if it isn't neccessary):

```shell
cordova platform update android
```

## How does it work?

## Getting Started

```shell
cordova plugin add cordova-plugin-cortex-decoder@latest
```

1. Add your license keys to the app `config.xml` file:

```xml
<preference name="CortexLicenseKey" value="YOUR-CORTEX-LICENSE-KEY" />
```

2. To ensure that your app is correctly licensed call the functions isLicenseActivated and isLicenseExpired at app start before calling any other function of the plugin.

```javascript
cordova.plugins.cortexdecoder.isLicenseActivated(this.licenseActivatedSuccess.bind(this), this.error.bind(this), null);
cordova.plugins.cortexdecoder.isLicenseExpired(this.licenseExpiredSuccess.bind(this), this.error.bind(this), null);      
``` 

dependend on the callback result you will be required to call activateLicense function of the plugin.

```javascript
cordova.plugins.cortexdecoder.activateLicense(this.licenseSuccess.bind(this), this.error.bind(this), "");
``` 

the third parameter of this function must be an empty string or a valid Cortex License Key. Keep in mind the security risc providing the key in javascript code. Providing the Key in this function call is required if the Cortex License Key is not included in your config.xml file.

3. Now you can call call the Plugin functions like:

```javascript
cordova.plugins.cortexdecoder.<FUNKTION-NAME>(<SUCCESS-CALLBACK>, <ERROR-CALLBACK>, <PARAMETERS>);
``` 

## Plugin Usage

With the CortexDecoder plugin installed and configured, the only thing left is to add the necessary code to your app.

1. Call the provided functions and add the callbacks.

2. The callback parameter provides a JSON array with the following content:

- __FunctionName__: name of the calling function.
- __error__: error description in case of an error.
- __intValue__: return value has to be interpreted as an integer.
- __stringValue__: return value has to be interpreted as an string.
- __boolValue__: return value has to be interpreted as an boolean.
- __longValue__: return value has to be interpreted as an long.
- __floatValue__: return value has to be interpreted as an float.
- __objValue__: return value has to be interpreted as an object(ie. barcode object).

example:

in case of returning a single barcode the intValue contains 1 and the objValue contains the entries:

- __SymbologyType__: the barcode type.
- __Data__: the decoded data.             
- __Length__: length of the decoded data.

in case of returning multiple barcodes the inValue field contains the count of barcodes provided in by the objValue field.
The objValue field contains an array of barcodes entries with the fields described above.

## API Reference

- __[constants](#constants)__: The constants available for usage.

- __[activateLicense](#activatelicense)__: activates the license for your app on the device.

- __[captureCurrentImageInBuffer](#capturecurrentimageinbuffer)__: 

- __[changeBeepPlayerSound](#changebeepplayersound)__: 

- __[closeCamera](#closecamera)__: 

- __[closeSharedObject](#closeSsharedobject)__: 

- __[currentSizeOfDecoderVideo](#currentsizeofdecodervideo)__:

- __[decoderTimeLimitInMilliseconds](#decodertimelimitinmilliseconds)__:

- __[decoderVersion](#decoderversion)__:

- __[decoderVersionLevel](#decoderversionlevel)__:

- __[doDecode](#dodecode)__:

- __[enableBeepPlayer](#enablebeepplayer)__: 

- __[enableFixedExposureMode](#enablefixedexposuremode)__: 

- __[enableScannedImageCapture](#enablescannedimagecapture)__: 

- __[enableVibrateOnScan](#enablevibrateonscan)__: 

- __[ensureRegionOfInterest](#ensureregionofinterest)__: 

- __[generateDeviceID](#generatedeviceid)__: 

- __[getCameraPreview](#getcamerapreview)__: 

- __[getDecodeVal](#getdecodeval)__: 

- __[getExposureTime](#getexposuretime)__: 

- __[getFocusDistance](#getfocusdistance)__: 

- __[getLicensedSymbologies](#getlicensedsymbologies)__: 

- __[getMaxZoom](#getmaxzoom)__: 

- __[getSdkVersion](#getsdkversion)__: 

- __[getSensitivityBoost](#getsensitivityboost)__: 

- __[getSizeForROI](#getsizeforroi)__: 

- __[getSupportedCameraTypes](#getsupportedcameratypes)__: 

- __[getSupportedFocusModes](#getsupportedfocusmodes)__: 

- __[getSupportedWhiteBalance](#getsupportedwhitebalance)__: 

- __[getZoomRatios](#getzoomratios)__: 

- __[hasTorch](#hastorch)__: 

- __[isLicenseActivated](#islicenseactivated)__: 

- __[isLicenseExpired](#islicenseexpired)__: 

- __[isZoomSupported](#iszoomsupported)__: 

- __[libraryVersion](#libraryversion)__: 

- __[loadLicenseFile](#loadlicensefile)__: 

- __[lowContrastDecodingEnabled](#lowcontrastdecodingenabled)__: 

- __[playBeepSound](#playbeepsound)__: 

- __[regionOfInterestHeight](#regionofinterestheight)__: 

- __[regionOfInterestLeft](#regionofinterestleft)__: 

- __[regionOfInterestTop](#regionofinteresttop)__: 

- __[regionOfInterestWidth](#regionofinterestwidth)__: 

- __[setAutoFocusResetByCount](#setautofocusresetbycount)__: 

- __[setCameraType](#setcameratype)__: 

- __[setCameraZoom](#setcamerazoom)__: 

- __[setDecoderResolution](#setdecoderresolution)__: 

- __[setDecoderToleranceLevel](#setdecodertolerancelevel)__: 

- __[setEncodingCharsetName](#setencodingcharsetname)__: 

- __[setExactlyNBarcodes](#setexactlynbarcodes)__: 

- __[setExposureSensitivity](#setexposuresensitivity)__: 

- __[setExposureTime](#setexposuretime)__: 

- __[setFocus](#setfocus)__: 

- __[setFocusDistance](#setfocusdistance)__: 

- __[setNumberOfBarcodesToDecode](#setnumberofbarcodestodecode)__: 

- __[setTorch](#settorch)__: 

- __[setWhiteBalance](#setwhitebalance)__: 

- __[startCameraPreview](#startcamerapreview)__: 

- __[startDecoding](#startdecoding)__: 

- __[stopCameraPreview](#stopcamerapreview)__: 

- __[stopDecoding](#stopdecoding)__: 

- __[stringFromSymbologyType](#stringfromsymbologytype)__: 

- __[setSymbologyParameters](#setsymbologyparameters)__: 

- __[CameraTypeValueOf](#cameratypevalueof)__: 

- __[CameraTypeValues](#cameratypevalues)__: 

- __[FocusValueOf](#focusvalueof)__: 

- __[FocusValues](#focusvalues)__: 

- __[SymbologyTypeValueOf](#symbologytypevalueof)__: 

- __[SymbologyTypeValues](#symbologytypevalues)__: 

- __[setCameraButtons](#setcamerabuttons)__: 

- __[showCrossHair](#showcrosshair)__: 

- __[toggleCamera](#togglecamera)__: 

- __[enableNativeZoom](#enablenativezoom)__: 

- __[enableSeekBarZoom](#enableseekbarzoom)__:

- __[enableAugmentedReality](#enableaugmentedreality)__:

- __[ar_showVisualizeBarcodes](#ar_showvisualizebarcodes)__:

- __[ar_detectBarcode](#ar_detectbarcode)__:

- __[ar_showDetails](#ar_showdetails)__:

- __[enableAllDecoders](#enablealldecoders)__:

- __[activateEDKLicense](#activateedklicense)__:

### Constants

Resolution
- __Resolution_1280x720__ = "Resolution_1280x720";
- __Resolution_1920x1080__ = "Resolution_1920x1080";
- __Resolution_352x288__ = "Resolution_352x288";
- __Resolution_640x480__ = "Resolution_640x480";


Camera Type
- __CameraType_BackFacing__ = "BackFacing";
- __CameraType_FrontFacing__ = "FrontFacing";


Focus
- __Focus_Far__ = "Focus_Far";
- __Focus_Fix_Far__ = "Focus_Fix_Far";
- __Focus_Fix_Normal__ = "Focus_Fix_Normal";
- __Focus_Normal__ = "Focus_Normal";

### activateLicense

```javascript
activateLicense(onSuccess, onError?, productKey?: String);
```
Version 1.0.0
Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __productKey__ *(String)* - (optional) a valid License Key.

### captureCurrentImageInBuffer

```javascript
captureCurrentImageInBuffer(onSuccess, onError?);
```
Version 1.0.0

Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### changeBeepPlayerSound

```javascript
changeBeepPlayerSound(onSuccess, onError?, name: String);
```
Version 1.0.0

Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __name__ *(String)* the name of the sound to be played.

### closeCamera

```javascript
closeCamera(onSuccess, onError?);
```
Version 1.0.0

Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### closeSharedObject

```javascript
closeSharedObject(onSuccess, onError?);
```
Version 1.0.0

Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

###

```javascript
CRD_Set(onSuccess, onError?, property: String, value: any);
```
Version 1.0.0

Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### currentSizeOfDecoderVideo

```javascript
currentSizeOfDecoderVideo(onSuccess, onError?);
```
Version 1.0.0

Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### decoderTimeLimitInMilliseconds

```javascript
decoderTimeLimitInMilliseconds(onSuccess, onError?, milliseconds?: number);
```
Version 1.0.0

Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __milliseconds__ *(Number)* this should be a positive integer representing the timeout in milliseconds. If set to 0 no timeout will be used.

### decoderVersion

```javascript
decoderVersion(onSuccess, onError?);
```
Version 1.0.0

Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### decoderVersionLevel

```javascript
decoderVersionLevel(onSuccess, onError?);
```
Version 1.0.0

Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### doDecode

```javascript
doDecode(onSuccess, onError?);
```
Version 1.0.0

Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __pixBuf__ *(Array)* an Image is converted to a byte buffer so that it can be used by the decoder to decode the barcode
- __width__ *(Number)* the width of the image
- __height__ *(Number)* the height of the image
- __stride__ *(Number)* the stride/width of the image
  
### enableBeepPlayer

```javascript
enableBeepPlayer(onSuccess, onError?, enable: Boolean);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __enable__ *(Boolean)* true to enable.

### enableFixedExposureMode

```javascript
enableFixedExposureMode(onSuccess, onError?, enabled: Boolean, exposureValue: number);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __enabled__ *(Boolean)* If set to true, then fixed exposure mode is enabled.

- __exposureValue__ *(Long)* This should be a Long integer representing the new value for exposure compensation.

### enableScannedImageCapture

```javascript
enableScannedImageCapture(onSuccess, onError?, enable: Boolean);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __enable__ *(Boolean)* true to enable.

### enableVibrateOnScan

```javascript
enableVibrateOnScan(onSuccess, onError?, enable: Boolean);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __enable__ *(Boolean)* true to enable.

### ensureRegionOfInterest

```javascript
ensureRegionOfInterest(onSuccess, onError?, enable: Boolean);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __enable__ *(Boolean)* true to enable.

### generateDeviceID

```javascript
generateDeviceID(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### getCameraPreview

```javascript
getCameraPreview(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### getDecodeVal

```javascript
getDecodeVal(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### getExposureTime

```javascript
getExposureTime(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### getFocusDistance

```javascript
getFocusDistance(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### getLicensedSymbologies

```javascript
getLicensedSymbologies(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### getMaxZoom

```javascript
getMaxZoom(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### getSdkVersion

```javascript
getSdkVersion(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### getSensitivityBoost

```javascript
getSensitivityBoost(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### getSizeForROI

```javascript
getSizeForROI(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### getSupportedCameraTypes

```javascript
getSupportedCameraTypes(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### getSupportedFocusModes

```javascript
getSupportedFocusModes(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### getSupportedWhiteBalance

```javascript
getSupportedWhiteBalance(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### getZoomRatios

```javascript
getZoomRatios(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### hasTorch

```javascript
hasTorch(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### isLicenseActivated

```javascript
isLicenseActivated(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### isLicenseExpired

```javascript
isLicenseExpired(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### isZoomSupported

```javascript
isZoomSupported(onSuccess, onError?);
`````
Version 1.0.0
`

Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### libraryVersion

```javascript
libraryVersion(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### loadLicenseFile

```javascript
loadLicenseFile(onSuccess, onError?, fileContent: String);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __fileContent__ *(String)* a string that consists the content of the license file obtained License Server.

### lowContrastDecodingEnabled

```javascript
lowContrastDecodingEnabled(onSuccess, onError?, enabled: Boolean);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __enabled__ *(Boolean)* true to enable.

### playBeepSound

```javascript
playBeepSound(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### regionOfInterestHeight

```javascript
regionOfInterestHeight(onSuccess, onError?, roiHeight: number);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __roiHeight__ *(Number)* This is the height of the ROI rectangle. The default value is 0, indicating the full image height is used. Otherwise, roiHeight can be a value up to (imageHeight � roiHeight).

### regionOfInterestLeft

```javascript
regionOfInterestLeft(onSuccess, onError?, column: number);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __column__ *(Number)* This is the x or column coordinate of the ROI upper-left corner. The default value is 0.

### regionOfInterestTop

```javascript
regionOfInterestTop(onSuccess, onError?, row: number);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __row__ *(Number)* This is the y or row coordinate of the ROI top-left corner. The default value is 0.

### regionOfInterestWidth

```javascript
regionOfInterestWidth(onSuccess, onError?, roiWidth: number);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __roiWidth__ *(Number)* This is the width of the ROI rectangle. The default value is 0, indicating the full image width is used. Otherwise, roiWidth can be a value up to (imageWidth � roiWidth).

### setAutoFocusResetByCount

```javascript
setAutoFocusResetByCount(onSuccess, onError?, mEnabled: Boolean);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __mEnabled__ *(Boolean)* if true then autofocus restart every 20 frames of no decode is enabled.

### setCameraType

```javascript
setCameraType(onSuccess, onError?, cameraType: Number);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __cameraType__ *(CameraType)*

### setCameraZoom

```javascript
setCameraZoom(onSuccess, onError?, enabled: Boolean,, zoom: number);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __enabled__ *(Boolean)* true to enable the feature.

- __zoom__ *(Float)* float value that specifies the zoom value that camera should use.

### setDecoderResolution

```javascript
setDecoderResolution(onSuccess, onError?, resolution: number);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __resolution__ *(Resolution)* Resolution to use for decoding.

### setDecoderToleranceLevel

```javascript
setDecoderToleranceLevel(onSuccess, onError?, toleranceLevel: number);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __toleranceLevel__ *(Number)* sets the tolerance level.

### setEncodingCharsetName

```javascript
setEncodingCharsetName(onSuccess, onError?, charsetName: String);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __charsetName__ *(String)* Charset to use for encoding barcode data.

### setExactlyNBarcodes

```javascript
setExactlyNBarcodes(onSuccess, onError?, enable: boolean);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __enable__ *(Boolean)*

### setExposureSensitivity

```javascript
setExposureSensitivity(onSuccess, onError?, iso: number);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __iso__ *(String)* sets the exposure sensitivity to ep.

### setExposureTime

```javascript
setExposureTime(onSuccess, onError?, ep: number);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __ep__ *(Long)* sets the exposure time to ep.

### setFocus

```javascript
setFocus(onSuccess, onError?, focus: number);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __focus__ *(Focus)* Focus mode is set to focus.

### setFocusDistance

```javascript
setFocusDistance(onSuccess, onError?, distance: number);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __distance__ *(Float)* sets the focus distance to distance.

### setNumberOfBarcodesToDecode

```javascript
setNumberOfBarcodesToDecode(onSuccess, onError?, num: number);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __num__ *(Number)*

### setTorch

```javascript
setTorch(onSuccess, onError?, on: boolean);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __on__ *(Boolean)* whether to turn on torch.

### setWhiteBalance

```javascript
setWhiteBalance(onSuccess, onError?, enable: boolean, mBalance: number);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __enable__ *(Boolean)* is true then thsi feature is enabled.

- __mBalance__ *(String)* sets the white balance mode if enable is true.

### startCameraPreview

```javascript
startCameraPreview(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### startDecoding

```javascript
startDecoding(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### stopCameraPreview

```javascript
stopCameraPreview(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### stopDecoding

```javascript
stopDecoding(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### stringFromSymbologyType

```javascript
stringFromSymbologyType(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __type__ *(SymbologyType)* The SymbologyType that you want returned as a string.

### CameraTypeValueOf

```javascript
CameraTypeValueOf(onSuccess, onError?, name: String);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### CameraTypeValues

```javascript
CameraTypeValues(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### FocusValueOf

```javascript
FocusValueOf(onSuccess, onError?, name: String);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### FocusValues

```javascript
FocusValues(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### SymbologyTypeValueOf

```javascript
SymbologyTypeValueOf(onSuccess, onError?, name: String);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### SymbologyTypeValues

```javascript
SymbologyTypeValues(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### setSymbologyProperties

```javascript
setSymbologyProperties(onSuccess, onError?, symbology: String, props);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __symbology__ *(String)*

- __props__ *(SymbologyProperties)*

### setCameraButtons

```javascript
setCameraButtons(onSuccess, onError?, camerabuttons);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __camerabuttons__ *(CameraButtons[])*

### showCrossHair

```javascript
showCrossHair(onSuccess, onError?, show: boolean);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __show__ *(Boolean)*

### toggleCamera

```javascript
toggleCamera(onSuccess, onError?);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

### enableNativeZoom

```javascript
enableNativeZoom(onSuccess, onError?, enable: boolean);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __enable__: *(Boolean)* Enable or disbale the nativeZoom

### enableSeekBarZoom

```javascript
enableSeekBarZoom(onSuccess, onError?, enable: boolean);
```
Version 1.0.0

__NOT-SUPPORTED__
Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __enable__: *(Boolean)* Enable or disbale the seekbar

### enableAugmentedReality

```javascript
enableAugmentedReality(onSuccess, onError?, enable: boolean);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __enable__: *(Boolean)* Enable or disbale the augmentedRality

### ar_showVisualizeBarcodes

```javascript
ar_showVisualizeBarcodes(onSuccess, onError?, enable: boolean);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __enable__: *(Boolean)* Enable or disbale

### ar_detectBarcode

```javascript
ar_detectBarcode(onSuccess, onError?, data: string);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __data__: *(String)* The barcodedata that the AR is looking for.


### ar_showDetails

```javascript
ar_showDetails(onSuccess, onError?, html: string);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __html__: *(String)* A normal html string that get displayed, when the barcode gets decoted.

### enableAllDecoders

```javascript
enableAllDecoders(onSuccess, onError?, enable: boolean);
```
Version 1.0.0


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __enable__: *(Boolean)* Enable or disable all decoders.

### activateEDKLicense

```javascript
activateEDKLicense(onSuccess, onError?, mFileName: string, mCustomerID: string);
```
Version 1.0.1


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __mFileName__: *(String)* The path to the EDK-File.

- __mCustomerID__: *(String)* The customerID for the EDK-Key.

### initCaptureID
```javascript
initCaptureID(onSuccess, onError?, message: string, showTextMessage: boolean);
```
Version 1.0.8


Parameters:

- __onSuccess__: Required callback invoked if the plugin was successfully notified.

- __onError__: Optional callback invoked in case of an error during notifying the plugin.

- __message__: *(String)* Optional on Android we show a MessageBox with the message, why the user should allow the permissions.

- __showTextMessage__: *(Boolean)* Optional if set to true, the MessageBox shows the __message__ string. 


## PhoneGap Build

## Example Apps