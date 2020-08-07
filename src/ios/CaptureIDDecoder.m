#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVInvokedUrlCommand.h>
#import <AudioToolbox/AudioServices.h>
#import "CaptureIDDecoder.h"

@implementation CaptureIDDecoder

-(instancetype)init {
    if(self = [super init]) {
        self.CPID_license_Valid = NO;
        self.CPID_license_Activated = NO;
        self.CPID_license_Expires_In_Days = @"";
        self.CPID_license_Status = @"";
        self.CPID_version = @"";
        self.CPID_sdkVersion = @"";
        self.CPID_decorderVersion = @"";
        self.CPID_sdk = @"";
        self.CPID_decoderCallbackID = @"";
        self.CPID_licenseCallbackID = @"";
        self.CPID_augmentedReality = NO;
        // -- Exposure --//
        self.CPID_exposure_ISO = 100;
        self.CPID_exposure_Value = 1;
        self.CPID_exposure_TimeScale = 100;
        self.CPID_exposure_enabled = NO;
    }
    return self;
}

-(void) pluginInitialize {
  // start as transparent
    self.webView.opaque = NO;
    self.webView.backgroundColor = [UIColor clearColor];
    //self.CPID_decoder = [[CPIDiOSCaptureIDLibrary alloc]initWithUIview:self.webView];
    // todo Test ob das hier schon wirklich notwendig ist!
//    self.license_Activated = [[CortexDecoderLibrary sharedObject]validateLicenseKey];
//    self.accessoryDeviceType = [[CortexDecoderLibrary sharedObject]getSledAccessoryConnected];
}

#pragma mark - Cortex

- (void)iOS_showAppSettings:(CDVInvokedUrlCommand *)command {
    [self.CPID_decoder showAppSettings];
    NSDictionary *resultDictionary = @{@"FunctionName": @"iOS_showAppSettings",
                                       @"error": @"",
                                       @"intValue": [[NSNumber alloc]initWithInt:0],
                                       @"stringValue": @"",
                                       @"boolValue": [[NSNumber alloc]initWithBool:YES],
                                       @"longValue": [[NSNumber alloc]initWithLong:0],
                                       @"floatValue": [[NSNumber alloc]initWithFloat:0.0],
                                       @"objValue": @""};
    NSMutableArray *array = [NSMutableArray arrayWithObject:resultDictionary];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:array];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void)initCaptureID:(CDVInvokedUrlCommand *)command {
    self.CPID_decoder = [[CPIDiOSCaptureIDLibrary alloc]initWithUIview:self.webView resultBlock:^(BOOL result) {
        if(result) {
            // the user has given the permission
            NSDictionary *resultDictionary = @{@"FunctionName": @"initCaptureID",
                                               @"error": @"",
                                               @"intValue": [[NSNumber alloc]initWithInt:0],
                                               @"stringValue": @"",
                                               @"boolValue": [[NSNumber alloc]initWithBool:YES],
                                               @"longValue": [[NSNumber alloc]initWithLong:0],
                                               @"floatValue": [[NSNumber alloc]initWithFloat:0.0],
                                               @"objValue": @""};
            NSMutableArray *array = [NSMutableArray arrayWithObject:resultDictionary];
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:array];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        } else {
            // the user has not granted the permission
            // we send error-callback
            NSDictionary *resultDictionary = @{@"FunctionName": @"initCaptureID",
                                               @"error": @"",
                                               @"intValue": [[NSNumber alloc]initWithInt:0],
                                               @"stringValue": @"We need the permission = Camera",
                                               @"boolValue": [[NSNumber alloc]initWithBool:false],
                                               @"longValue": [[NSNumber alloc]initWithLong:0],
                                               @"floatValue": [[NSNumber alloc]initWithFloat:0.0],
                                               @"objValue": @""};
            NSMutableArray *array = [NSMutableArray arrayWithObject:resultDictionary];
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsArray:array];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    }];
}

#pragma mark - Version

- (void)decoderVersion:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder decoderVersion];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void)decoderVersionLevel:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder decoderVersionLevel];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)getSdkVersion:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder getSdkVersion];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void)libraryVersion:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder libraryVersion];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


#pragma mark - License activation

-(void)activateLicense:(CDVInvokedUrlCommand *)command {
    self.CPID_licenseCallbackID = command.callbackId;
    __block CDVPluginResult* pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    NSString *license = dict[@"productKey"];

    if([license isEqualToString:@""]) {
        NSLog(@"get License-Key from config.xml");
        license = [self.commandDelegate.settings objectForKey:[@"CortexLicenseKey_iOS" lowercaseString]];
    }
    
    @try {
        if (license != nil && [license length] > 0) {
            [self.CPID_decoder activateLicense:license resultHandler:^(NSArray * _Nonnull result) {
                 pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:result];
                 [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            }];
            
        } else {
            //cant read license or is nil
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Key is null"];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    } @catch (NSException* ex) {
         pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[ex reason]];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
}

- (void)activateEDKLicense:(CDVInvokedUrlCommand *)command {
    __block CDVPluginResult* pluginResult = nil;
    self.CPID_licenseCallbackID = command.callbackId;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    self.CPID_filename = dict[@"mFileName"];
    self.CPID_customerID = dict[@"mCustomerID"];
    
    if(self.CPID_filename != nil && self.CPID_customerID != nil) {
        if(![self.CPID_filename isEqualToString:@""] && ![self.CPID_customerID isEqualToString:@""]) {
            // todo call EDK
            [self.CPID_decoder activateEDKLicense:self.CPID_filename customerID:self.CPID_customerID resultHandler:^(NSArray * _Nonnull result) {
                NSDictionary* dict = result[0];
                NSNumber *error = dict[@"error"];
                if([error boolValue] == YES) {
                    // Fehler
                     pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsArray:result];
                } else {
                    // Kein Fehler
                    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:result];
                }
                [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            }];
        } else {
            // Show Error
        }
    } else {
        // Show Error
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Please check Filename and CustomerID"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
}

- (void)isLicenseActivated:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult = nil;
    NSArray * res = [self.CPID_decoder isLicenseActivated];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)isLicenseExpired:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult = nil;
    NSArray * res = [self.CPID_decoder isLicenseExpired];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


#pragma mark - Scanner

-(void)startCameraPreview:(CDVInvokedUrlCommand *)command {
    self.CPID_decoderCallbackID = command.callbackId;
    CDVPluginResult *pluginResult = nil;
    NSArray * res = [self.CPID_decoder startCameraPreview:^(BOOL result) {
        
    }];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

//-(void)buildCloseButton {
//    self.closeButton = [UIButton buttonWithType:UIButtonTypeSystem];
//    [self.closeButton setTitle:@"X" forState:UIControlStateNormal];
//    [self.closeButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
//    self.closeButton.backgroundColor = [UIColor colorWithRed:0.2 green:0.2 blue:0.2 alpha:0.8];
//    self.closeButton.frame = CGRectMake(5.0, 20.0, 40, 40);
//    self.closeButton.layer.cornerRadius = 20;
//    self.closeButton.layer.borderColor = [UIColor whiteColor].CGColor;
//    self.closeButton.layer.borderWidth = 2.0f;
//    [self.closeButton addTarget:self action:@selector(closeButtonPressed:) forControlEvents:UIControlEventTouchUpInside];
//    [self.previewView addSubview:self.closeButton];
//}

//-(void)buildButtons {
//    for (CameraButtons* cameraButton in self.mCameraButtons) {
//        NSLog(@"Button_index : %@", cameraButton.mIndex);
//        UIButton* button = [UIButton buttonWithType:UIButtonTypeSystem];
//        [button setTitle:[self getButtonTitle:cameraButton] forState:UIControlStateNormal];
//        button.backgroundColor = [UIColor colorWithRed:1 green:1 blue:1 alpha:0.8];
//        button.frame = [self getPosition:cameraButton];
//        button.layer.cornerRadius = 20;
//        button.layer.borderColor = [UIColor whiteColor].CGColor;
//        button.layer.borderWidth = 2.0f;
//        // tag = button function
//        button.tag = [cameraButton.mFunction integerValue];
////        [self.closeButton addTarget:self action:@selector(closeButtonPressed:) forControlEvents:UIControlEventTouchUpInside];
//        [button addTarget:self action:@selector(onCameraButtonClicked:) forControlEvents:UIControlEventTouchUpInside];
//        [self.previewView addSubview:button];
//    }
//}

// sender.tag = function-ID
//-(void)onCameraButtonClicked:(UIButton*)sender {
//    NSLog(@"Button pressed: %ld", (long) sender.tag);
//    CDVPluginResult *pluginResult = nil;
//    PluginResultObject *res = [[PluginResultObject alloc] init];
//    res.mFunctionName = @"CameraButtonClicked";
//    res.mIntValue = [NSNumber numberWithInt:sender.tag];
//    switch (sender.tag) {
//        case 1:
//             res.mStringValue = @"scan";
//            break;
//        case 2:
//             res.mStringValue = @"close";
//            break;
//        case 3:
//             res.mStringValue = @"torch";
//            break;
//        case 4:
//             res.mStringValue = @"toggle";
//            //[self toggleCamera];
//            break;
//        default:
//            break;
//    }
//    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res.getArray];
//    [pluginResult setKeepCallbackAsBool:YES];
//    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.decoderCallbackID];
//}

// todo get Icon
//-(NSString*)getButtonTitle: (CameraButtons*) button {
//    NSString* ret = @"";
//    switch ([button.mIcon intValue]) {
//        case 1:
//            ret = @"scan";
//            break;
//        case 2:
//            ret = @"close";
//            break;
//        case 3:
//            ret = @"torch";
//            break;
//        case 4:
//            ret = @"toggle";
//            break;
//        default:
//            NSLog(@"getButtonTitle - > default");
//            break;
//    }
//    return ret;
//}

//-(CGRect)getPosition: (CameraButtons*) button {
//
//    CGFloat buttonWidth = self.previewView.bounds.size.width / 5;
//    CGFloat buttonHeight = 40.0;
//    CGFloat heigthMargin = 10.0;
//    CGFloat widthMargin = self.previewView.bounds.size.width / 40;
//    CGFloat x = 0, y = 0;
//
//    y = self.previewView.bounds.size.height - heigthMargin - buttonHeight;
//
//    switch ([button.mIndex intValue]) {
//        case 1:
//            x = widthMargin;
//            break;
//        case 2:
//            x = (3 * widthMargin) + buttonWidth;
//            break;
//        case 3:
//            x = (5 * widthMargin) + (2 * buttonWidth);
//            break;
//        case 4:
//            x = (7 * widthMargin) + (3 * buttonWidth);
//            break;
//        default:
//            break;
//    }
//    return CGRectMake(x, y, buttonWidth, buttonHeight);
//}

//-(void)closeButtonPressed:(UIButton *)button {
//    NSLog(@"Button Pressed");
//    [self.closeButton removeFromSuperview];
//    [self closeMethode];
//}

//- (void)displayPreview{
//    CGRect pFrame = self.webView.bounds;
//    self.previewView = [[CortexDecoderLibrary sharedObject]previewViewWithFrame:pFrame];
//    [self.webView addSubview:self.previewView];
//    if ([UIDevice currentDevice].userInterfaceIdiom == UIUserInterfaceIdiomPad) {
//        self.previewView.layer.cornerRadius = 8;
//        self.previewView.layer.masksToBounds = YES;
//    }
//    self.previewView.translatesAutoresizingMaskIntoConstraints = NO;
//}

-(void)closeMethode {
    [self.CPID_decoder stopCameraPreview];
    [self.CPID_decoder stopDecoding];
//    [[CortexDecoderLibrary sharedObject] enableVideoCapture:NO];
//    [[CortexDecoderLibrary sharedObject] enableDecoding:NO];
//    self.previewView.alpha = 0;
//    [self clearViews];
}

//- (void) startVideoCapture {
//    if ((_accessoryDeviceType == Sled_AccessoryTypeCR4300N) || (_accessoryDeviceType == Sled_AccessoryTypeNone)) {
//        // Trying to start the active AVCaptureSession can cause UI delays.
//        dispatch_async (dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
//            [[CortexDecoderLibrary sharedObject]enableVideoCapture:YES];
//        });
//    } else if (_accessoryDeviceType == Sled_AccessoryTypeCR4300){
//        // This code assumes decoder is filtering out the targeting bar
//        [[CortexDecoderLibrary sharedObject] enableDecoding:YES];
//        // Torch brightness
//        int torchBrightness = (int)[[NSUserDefaults standardUserDefaults] integerForKey:TORCH_BRIGHTNESS_SETTING];
//        float torchLevel = (float)torchBrightness / 100.0f;
//        [[CortexDecoderLibrary  sharedObject]setTorch:CD_Torch_On];
//        [[CortexDecoderLibrary sharedObject] setTorchBrightness:torchLevel];
//    }
//}

-(void)startDecoding:(CDVInvokedUrlCommand *)command {
    self.CPID_decoderCallbackID = command.callbackId;
    __block CDVPluginResult *pluginResult = nil;
    NSArray * res = [self.CPID_decoder startDecoder:^(NSArray * _Nonnull result) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:result];
        [pluginResult setKeepCallbackAsBool:NO];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

-(void)stopDecoding:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult = nil;
    NSArray * res = [self.CPID_decoder stopDecoding];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [pluginResult setKeepCallbackAsBool:NO];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.CPID_decoderCallbackID];
}

- (void)stopCameraPreview:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult = nil;
    NSArray * res = [self.CPID_decoder stopCameraPreview];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void)closeCamera:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult = nil;
    [self.CPID_decoder stopDecoding];
    [self.CPID_decoder stopCameraPreview];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"closeCamera"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void)captureCurrentImageInBuffer:(CDVInvokedUrlCommand *)command {
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    BOOL capture = [dict[@"enable"] boolValue];
    CDVPluginResult *pluginResult = nil;
    NSArray * res = [self.CPID_decoder captureImage:capture];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void)closeSharedObject:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult = nil;
    NSArray * res = [self.CPID_decoder closeSharedObject];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

//- (void)drawCircleWithRadius:(CGFloat)radius {
//    CGPoint ptCenter = self.webView.center;
//    CGRect rectBezierPath = CGRectMake(ptCenter.x - radius, ptCenter.y - radius, 2.0f * radius, 2.0f * radius);
//    CABasicAnimation *pathAnimation = [CABasicAnimation animationWithKeyPath:@"path"];
//    [pathAnimation setFromValue:(id)_circle.path];
//    [pathAnimation setToValue:(id)[UIBezierPath bezierPathWithRoundedRect:rectBezierPath cornerRadius:self.circleRadius].CGPath];
//    [pathAnimation setDuration:0.5f];
//    [pathAnimation setRepeatCount:1.0f];
//    [pathAnimation setTimingFunction:[CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionLinear]];
//    _circle.path = [UIBezierPath bezierPathWithRoundedRect:rectBezierPath cornerRadius:self.circleRadius].CGPath;
//    [_circle addAnimation:pathAnimation forKey:@"changePathAnimation"];
//}

-(void)enableVibrateOnScan:(CDVInvokedUrlCommand *)command {
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    BOOL vibrate = [dict[@"enable"] boolValue];
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder enableVibrateOnScan:vibrate];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void)changeBeepPlayerSound:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult = nil;
    //todo get file name from the JSON - Array
    NSArray *res = [self.CPID_decoder changeSound:@""];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void)enableScannedImageCapture:(CDVInvokedUrlCommand *)command {
    //enableScannedImageCapture is deprecated -> enableImageSaving with CD_ImageSavingType
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    BOOL enable = [dict[@"enable"] boolValue];
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder enableScannedImageCapture:enable];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


#pragma mark - Decoder

-(void)lowContrastDecodingEnabled:(CDVInvokedUrlCommand *)command {
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    BOOL lowContrast = [dict[@"enable"] boolValue];
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder lowContrastDecodingEnabled:lowContrast];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) decoderTimeLimitInMilliseconds:(CDVInvokedUrlCommand*)command {
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    int timeLimit = [dict[@"milliseconds"] intValue];
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder decoderTimeLimitInMilliseconds:timeLimit];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) setDecoderResolution:(CDVInvokedUrlCommand*)command {
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    NSString* decoderResolution = [dict[@"resolution"] stringValue];
    CDVPluginResult *pluginResult = nil;
    if([decoderResolution isEqualToString:@"Resolution_352x288"] ||
       [decoderResolution isEqualToString:@"Resolution_640x480"] ||
       [decoderResolution isEqualToString:@"Resolution_1280x720"] ||
       [decoderResolution isEqualToString:@"Resolution_1920x1080"]) {
        NSArray *res = [self.CPID_decoder setDecoderResolution:decoderResolution];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsArray:res];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Resolution is not supported"];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

// Default is 1
// Level = 1 - 20
-(void) setNumberOfBarcodesToDecode:(CDVInvokedUrlCommand*)command {
    self.CPID_decoderCallbackID = command.callbackId;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    int num = [dict[@"num"] intValue];
    CDVPluginResult *pluginResult = nil;
    if( num >= 1 && num <= 20 ) {
        NSArray * res = [self.CPID_decoder setNumberOfBarcodesToDecode:num];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Number is not supported."];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

// Default is 10
// Value tolorance level = 0 - 10
-(void) setDecoderToleranceLevel:(CDVInvokedUrlCommand*)command {
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    int tolerancLevel = [dict[@"toleranceLevel"] intValue];
    CDVPluginResult *pluginResult = nil;
    if( tolerancLevel >= 0 && tolerancLevel <= 10 ) {
        NSArray * res = [self.CPID_decoder setDecoderToleranceLevel:tolerancLevel];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Value is not supported."];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) getLicensedSymbologies:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray * res = [self.CPID_decoder getLicensedSymbologies];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) enableAllDecoders:(CDVInvokedUrlCommand*)command {
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    BOOL enable = [dict[@"enable"] boolValue];
    NSArray * res = [self.CPID_decoder enableAllDecoders:enable];
    CDVPluginResult *pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


#pragma mark - Device

-(void)setCameraType:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    NSString *camera = dict[@"cameraType"];
    NSArray * res = [self.CPID_decoder setCameraType:camera];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void)getSupportedCameraTypes:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder getSupportedCameraTypes];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) setFocus:(CDVInvokedUrlCommand*)command {
    NSLog(@"setFocus");
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    NSString *focus = dict[@"focus"];
    
    NSArray *res = [self.CPID_decoder setFocus:focus];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) isZoomSupported:(CDVInvokedUrlCommand*)command {
    NSLog(@"isZoomSupported");
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder isZoomSupported];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) setTorch:(CDVInvokedUrlCommand*)command {
    self.CPID_decoderCallbackID = command.callbackId;
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    BOOL torchon = [dict[@"on"]boolValue];
    NSArray *res = [self.CPID_decoder setTorch:torchon];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) currentSizeOfDecoderVideo:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder currentSizeOfDecoderVideo];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) hasTorch:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder hasTorch];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) enableBeepPlayer:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    BOOL beepPlayer = [dict[@"enable"]boolValue];
    NSArray *res = [self.CPID_decoder enableBeepPlayer:beepPlayer];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}



#pragma mark - Region

-(void) regionOfInterestLeft:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    int value = [dict[@"column"]intValue];
    NSArray *res = [self.CPID_decoder regionOfInterestLeft:value];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) regionOfInterestTop:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    int value = [dict[@"row"]intValue];
    NSArray *res = [self.CPID_decoder regionOfInterestTop:value];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) regionOfInterestWidth:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    int value = [dict[@"roiWidth"]intValue];
    NSArray *res = [self.CPID_decoder regionOfInterestWidth:value];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) regionOfInterestHeight:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    int value = [dict[@"roiHeight"]intValue];
    NSArray *res = [self.CPID_decoder regionOfInterestHeight:value];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) ensureRegionOfInterest:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    BOOL enable = [dict[@"enable"]boolValue];
    NSArray *res = [self.CPID_decoder ensureRegionOfInterest:enable];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


#pragma mark - Views


-(void) setCameraButtons:(CDVInvokedUrlCommand*)command {
    self.CPID_decoderCallbackID = command.callbackId;
    CDVPluginResult *pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Not supported"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}

-(void)showCrossHair:(CDVInvokedUrlCommand *)command {
    self.CPID_decoderCallbackID = command.callbackId;
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    BOOL enable = [dict[@"show"]boolValue];
    NSArray *res = [self.CPID_decoder showCrossHair:enable];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) toggleCamera:(CDVInvokedUrlCommand*)command {
    self.CPID_decoderCallbackID = command.callbackId;
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder toggleCamera];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

/**
 Returns Error, because function is not supported from the captureID-Library
 */
-(void) enableNativeZoom:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    BOOL enable = [dict[@"enable"]boolValue];
    NSArray *res = [self.CPID_decoder enableNativeZoom:enable];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

/**
 Returns Error, because function is not supported from the captureID-Library
 */
-(void) enableSeekBarZoom:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    BOOL enable = [dict[@"enable"]boolValue];
    NSArray *res = [self.CPID_decoder enableSeekBarZoom:enable];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


#pragma mark - Augmentedreality

-(void) enableAugmentedReality:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    BOOL enable = [dict[@"enable"]intValue];
    self.CPID_augmentedReality = enable;
    NSArray *res = [self.CPID_decoder enableAugmentedReality:enable];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) ar_showVisualizeBarcodes:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    if(self.CPID_augmentedReality) {
        NSDictionary* dict = [[command arguments] objectAtIndex:0];
        BOOL enable = [dict[@"enable"]intValue];
        NSArray * res = [self.CPID_decoder ar_showVisualizeBarcodes:enable];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"enable Augmented Reality to show visualized Barcodes."];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) ar_detectBarcode:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    if(self.CPID_augmentedReality) {
        NSDictionary* dict = [[command arguments] objectAtIndex:0];
        NSString* data = dict[@"data"];
        NSArray * res = [self.CPID_decoder ar_detectBarcode:data];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"enable Augmented Reality to show visualized Barcodes."];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) ar_showDetails:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    NSString* data = dict[@"html"];
    NSArray *res = [self.CPID_decoder ar_showDetails:data];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


#pragma mark - Other functions

// -- other Functions -- //
-(void) CRD_Set:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder CRD_Set];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) doDecode:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder doDecode];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) enableFixedExposureMode:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    BOOL value = [dict[@"enabled"]boolValue];
    self.CPID_exposure_enabled = value;
    NSArray *res = [self.CPID_decoder enableFixedExposureMode:value];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) generateDeviceID:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder generateDeviceID];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) getCameraPreview:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder getCameraPreview];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) getDecodeVal:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder getDecodeVal];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) getExposureTime:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder getExposureTime];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) getFocusDistance:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder getFocusDistance];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) getMaxZoom:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder getMaxZoom];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) getSensitivityBoost:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder getSensitivityBoost];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) getSizeForROI:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder getSizeForROI];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) getSupportedFocusModes:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder getSupportedFocusModes];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) getSupportedWhiteBalance:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder getSupportedWhiteBalance];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) getZoomRatios:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder getZoomRatios];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) loadLicenseFile:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    NSString *filename = [dict[@"fileContent"]stringValue];
    NSArray *res = [self.CPID_decoder loadLicenseFile:filename];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) playBeepSound:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder playBeepSound];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) setAutoFocusResetByCount:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    BOOL value = [dict[@"enabled"]boolValue];
    NSArray *res = [self.CPID_decoder setAutoFocusResetByCount:value];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) setCameraZoom:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    BOOL enable = [dict[@"enabled"]boolValue];
    NSNumber *zoom = [[NSNumber alloc]initWithFloat:[dict[@"enabled"]floatValue]];
    NSArray *res = [self.CPID_decoder setCameraZoom:enable cameraZoom:zoom];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) setEncodingCharsetName:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    NSString *charset = dict[@"charsetName"];
    NSArray *res = [self.CPID_decoder setEncodingCharsetName:charset];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) setExactlyNBarcodes:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    BOOL value = [dict[@"enable"]boolValue];
    NSArray *res = [self.CPID_decoder setExactlyNBarcodes:value];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) setExposureSensitivity:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    NSNumber *value = [[NSNumber alloc] initWithInt:[dict[@"iso"]intValue]];
    if(self.CPID_exposure_enabled) {
        NSArray *res = [self.CPID_decoder setExposureSensitivity:value];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Enable FixedExposureMode first"];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) setExposureTime:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    NSNumber *value = [[NSNumber alloc]initWithInt:[dict[@"ep"]intValue]];
    if(self.CPID_exposure_enabled) {
        NSArray *res = [self.CPID_decoder setExposureTime:value];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Enable FixedExposureMode first"];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) setFocusDistance:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    NSNumber *value = [[NSNumber alloc]initWithInt:[dict[@"distance"]intValue]];
    NSArray *res = [self.CPID_decoder setFocusDistance:value];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) setWhiteBalance:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    BOOL enable = [dict[@"enable"]boolValue];
    NSString *balance = [dict[@"mBalance"]stringValue];
    NSArray *res = [self.CPID_decoder setWhiteBalance:enable balance:balance];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) stringFromSymbologyType:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    NSString *value = [dict[@"type"]stringValue];
    NSArray *res = [self.CPID_decoder stringFromSymbologyType:value];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) CameraTypeValueOf:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    NSString *value = [dict[@"name"]stringValue];
    NSArray *res = [self.CPID_decoder CameraTypeValueOf:value];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) CameraTypeValues:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder CameraTypeValues];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) FocusValueOf:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    NSString *value = [dict[@"name"]stringValue];
    NSArray *res = [self.CPID_decoder FocusValueOf:value];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) FocusValues:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder FocusValues];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) SymbologyTypeValueOf:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSDictionary* dict = [[command arguments] objectAtIndex:0];
    NSString *value = [dict[@"name"]stringValue];
    NSArray *res = [self.CPID_decoder SymbologyTypeValueOf:value];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) SymbologyTypeValues:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = nil;
    NSArray *res = [self.CPID_decoder SymbologyTypeValues];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) setSymbologyProperties:(CDVInvokedUrlCommand*)command {
    self.CPID_decoderCallbackID = command.callbackId;
    CDVPluginResult *pluginResult = nil;
    
    NSDictionary* symbology = [[command arguments] objectAtIndex:0];
    NSString *value = symbology[@"symbology"];
    
    NSDictionary* data = [self parsePreferences:[[command arguments] objectAtIndex:1]];
    
    NSArray *res = [self.CPID_decoder setSymbologyProperties:value symbologyData:data];
   
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:res];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (NSMutableDictionary*) parsePreferences:(NSArray*) data {
    NSMutableDictionary *ret = [[NSMutableDictionary alloc] init];
    @try {
        if( data != nil) {
            for (int i = 0; i < [data count]; i++) {
                NSDictionary *d = [data objectAtIndex:i];
                NSString *type = d[@"type"];
                if([type isEqualToString:@"boolean"]) {
                    [ret setValue:[NSNumber numberWithBool:[d[@"value"]boolValue ]] forKey:d[@"key"]];
                } else if([type isEqualToString:@"integer"]) {
                    [ret setValue:[NSNumber numberWithInteger:[d[@"value"]integerValue ]] forKey:d[@"key"]];
                } else if([type isEqualToString:@"enum"]) {
                      [ret setValue:d[@"value"] forKey:d[@"key"]];
                }
            }
        }
    }
    @catch(NSException *ex) {
        NSLog(@"%@", ex.reason);
    }
    
    return ret;
}

#pragma mark - Orientation


@end
