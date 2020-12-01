#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVInvokedUrlCommand.h>
#import "CPIDiOSCaptureIDLibrary.h"

@interface CaptureIDDecoder : CDVPlugin

@property(nonatomic, strong) CPIDiOSCaptureIDLibrary *CPID_decoder;
@property NSString *CPID_filename;
@property NSString *CPID_customerID;

@property(nonatomic) BOOL CPID_license_Activated;
@property(nonatomic) BOOL CPID_license_Valid;
@property(nonatomic) BOOL CPID_license_Expires;
@property NSString *CPID_license_Status;
@property NSString *CPID_license_Expires_In_Days;
@property NSString *CPID_version;
@property NSString *CPID_sdkVersion;
@property NSString *CPID_decorderVersion;
@property NSString *CPID_sdk;
@property NSString *CPID_licenseCallbackID;
@property NSString *CPID_decoderCallbackID;
@property float CPID_circleRadius;
@property(nonatomic) BOOL CPID_augmentedReality;

// -- Buttons --//
@property(nonatomic) NSMutableArray *CPID_mCameraButtons;

// -- Exposure --//
@property(nonatomic) long CPID_exposure_Value;
@property(nonatomic) long CPID_exposure_TimeScale;
@property(nonatomic) long CPID_exposure_ISO;
@property(nonatomic) BOOL CPID_exposure_enabled;

// -- View -- //
//@property UIView *previewView;
//@property UIView *circleView;
//@property UIButton *closeButton;
//@property UITextView *ar_infoText;
//@property(weak, nonatomic) IBOutlet UIView *scanView;
//@property(weak, nonatomic) IBOutlet CAShapeLayer *circle;

// -- Common -- //
//@property(nonatomic, assign) CD_SledAccessoryDeviceType accessoryDeviceType;

- (void)initCaptureID:(CDVInvokedUrlCommand *)command;
- (void)iOS_showAppSettings:(CDVInvokedUrlCommand *)command;
// -- License -- //
- (void)activateLicense:(CDVInvokedUrlCommand *)command;
- (void)activateEDKLicense:(CDVInvokedUrlCommand *)command;
- (void)isLicenseActivated:(CDVInvokedUrlCommand *)command;
- (void)isLicenseExpired:(CDVInvokedUrlCommand *)command;

// -- Version -- //
- (void)decoderVersion:(CDVInvokedUrlCommand *)command;
- (void)decoderVersionLevel:(CDVInvokedUrlCommand *)command;
- (void)getSdkVersion:(CDVInvokedUrlCommand *)command;
- (void)libraryVersion:(CDVInvokedUrlCommand *)command;

// -- Scanner -- //
- (void)changeBeepPlayerSound:(CDVInvokedUrlCommand *)command;
- (void)captureCurrentImageInBuffer:(CDVInvokedUrlCommand *)command;
- (void)closeCamera:(CDVInvokedUrlCommand *)command;
- (void)closeSharedObject:(CDVInvokedUrlCommand *)command;
- (void)enableVibrateOnScan:(CDVInvokedUrlCommand *)command;
- (void)startDecoding:(CDVInvokedUrlCommand *)command;
- (void)startCameraPreview:(CDVInvokedUrlCommand *)command;
- (void)stopDecoding:(CDVInvokedUrlCommand *)command;
- (void)stopCameraPreview:(CDVInvokedUrlCommand *)command;
- (void)enableScannedImageCapture:(CDVInvokedUrlCommand *)command;

//-- Decoder -- //
- (void)lowContrastDecodingEnabled:(CDVInvokedUrlCommand *)command;
- (void)decoderTimeLimitInMilliseconds:(CDVInvokedUrlCommand *)command;
- (void)setDecoderResolution:(CDVInvokedUrlCommand *)command;
- (void)setNumberOfBarcodesToDecode:(CDVInvokedUrlCommand *)command;
- (void)setDecoderToleranceLevel:(CDVInvokedUrlCommand *)command;
- (void)getLicensedSymbologies:(CDVInvokedUrlCommand *)command;
//-(void) disableAllBarcodes:(CDVInvokedUrlCommand*)command;
- (void)enableAllDecoders:(CDVInvokedUrlCommand *)command;

// -- Device -- //
- (void)getSupportedCameraTypes:(CDVInvokedUrlCommand *)command;
- (void)setCameraType:(CDVInvokedUrlCommand *)command;
- (void)setFocus:(CDVInvokedUrlCommand *)command;
- (void)isZoomSupported:(CDVInvokedUrlCommand *)command;
- (void)setTorch:(CDVInvokedUrlCommand *)command;
- (void)currentSizeOfDecoderVideo:(CDVInvokedUrlCommand *)command;
- (void)hasTorch:(CDVInvokedUrlCommand *)command;
- (void)enableBeepPlayer:(CDVInvokedUrlCommand *)command;

// -- Region -- //
- (void)regionOfInterestLeft:(CDVInvokedUrlCommand *)command;
- (void)regionOfInterestTop:(CDVInvokedUrlCommand *)command;
- (void)regionOfInterestWidth:(CDVInvokedUrlCommand *)command;
- (void)regionOfInterestHeight:(CDVInvokedUrlCommand *)command;
- (void)ensureRegionOfInterest:(CDVInvokedUrlCommand *)command;

//-- Views -- //
- (void)setCameraButtons:(CDVInvokedUrlCommand *)command;
- (void)showCrossHair:(CDVInvokedUrlCommand *)command;
- (void)toggleCamera:(CDVInvokedUrlCommand *)command;
- (void)toggleCamera;
- (void)enableNativeZoom:(CDVInvokedUrlCommand *)command;
- (void)enableSeekBarZoom:(CDVInvokedUrlCommand *)command;
- (void)clearViews;

// --AugmentedReality -- //
- (void)enableAugmentedReality:(CDVInvokedUrlCommand *)command;
- (void)ar_showVisualizeBarcodes:(CDVInvokedUrlCommand *)command;
- (void)ar_detectBarcode:(CDVInvokedUrlCommand *)command;
- (void)ar_showDetails:(CDVInvokedUrlCommand *)command;

// -- other Functions -- //
- (void)CRD_Set:(CDVInvokedUrlCommand *)command;
- (void)doDecode:(CDVInvokedUrlCommand *)command;
- (void)enableFixedExposureMode:(CDVInvokedUrlCommand *)command;
- (void)generateDeviceID:(CDVInvokedUrlCommand *)command;
- (void)getCameraPreview:(CDVInvokedUrlCommand *)command;
- (void)getDecodeVal:(CDVInvokedUrlCommand *)command;
- (void)getExposureTime:(CDVInvokedUrlCommand *)command;
- (void)getFocusDistance:(CDVInvokedUrlCommand *)command;
- (void)getMaxZoom:(CDVInvokedUrlCommand *)command;
- (void)getSensitivityBoost:(CDVInvokedUrlCommand *)command;
- (void)getSizeForROI:(CDVInvokedUrlCommand *)command;
- (void)getSupportedFocusModes:(CDVInvokedUrlCommand *)command;
- (void)getSupportedWhiteBalance:(CDVInvokedUrlCommand *)command;
- (void)getZoomRatios:(CDVInvokedUrlCommand *)command;
- (void)loadLicenseFile:(CDVInvokedUrlCommand *)command;
- (void)playBeepSound:(CDVInvokedUrlCommand *)command;
- (void)setAutoFocusResetByCount:(CDVInvokedUrlCommand *)command;
- (void)setCameraZoom:(CDVInvokedUrlCommand *)command;
- (void)setEncodingCharsetName:(CDVInvokedUrlCommand *)command;
- (void)setExactlyNBarcodes:(CDVInvokedUrlCommand *)command;
- (void)setExposureSensitivity:(CDVInvokedUrlCommand *)command;
- (void)setExposureTime:(CDVInvokedUrlCommand *)command;
- (void)setFocusDistance:(CDVInvokedUrlCommand *)command;
- (void)setWhiteBalance:(CDVInvokedUrlCommand *)command;
- (void)stringFromSymbologyType:(CDVInvokedUrlCommand *)command;
- (void)CameraTypeValueOf:(CDVInvokedUrlCommand *)command;
- (void)CameraTypeValues:(CDVInvokedUrlCommand *)command;
- (void)FocusValueOf:(CDVInvokedUrlCommand *)command;
- (void)FocusValues:(CDVInvokedUrlCommand *)command;
- (void)SymbologyTypeValueOf:(CDVInvokedUrlCommand *)command;
- (void)SymbologyTypeValues:(CDVInvokedUrlCommand *)command;
- (void)setSymbologyProperties:(CDVInvokedUrlCommand *)command;
- (NSMutableDictionary *)parsePreferences:(NSArray *)data;

@end
