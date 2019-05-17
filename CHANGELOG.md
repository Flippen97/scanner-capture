# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.17] - 2019-05-14
### Changed
- Android: The camera start again when the user send the app to the background.

## [1.0.16] - 2019-05-14
### Changed
- iOS: Library updated to version 1.0.10 
- Android: Library to version 1.0.11

## [1.0.15] - 2019-05-09
### Changed
- Android: library updated to version 1.0.10
- iOS: library updated to version 1.0.8

### Fixed
- Android: add a function, that close the camera when the App was send to the background. The user need to activate the camera again. 

## [1.0.14] - 2019-05-xx
- Uwe hat ein Update bereitgestellt.

## [1.0.13] - 2019-05-02
### Fixed
- iOS: update the library to version 1.0.5.

### Added
- iOS: added the "setCharset" function 
    - Supported charsets are: 
        - ISO-8859-1
        - UTF-8
        - US-ASCII
        - UTF-16BE
        - UTF-16LE
        - UTF-16

## [1.0.12] - 2019-04-29
### Fixed
- Android: the Event "onDestroy" can crash the app, because the mCaptureID was null.

## [1.0.11] - 2019-04-04
### Fixed
- iOS setEncodingCharsetName app does not crash 

## [1.0.10] - 2019-04-04
### Changed
- iOS Deployment target = 10.0
- iOS Architectures in the fat file are i386, armv7, x86_64 and arm64.

## [1.0.9] - 2019-04-03
### Changed
- iOS: add architecture x86_64, so the architectures are x86_64 arm64. 

## [1.0.8] - 2019-04-01
### Changed
- Removed the resource from P4IT.

## [1.0.7] - 2019-04-01
### Changed
- Removed the resource tag from the AlertDialog, when we init the CaptureID-Plugin
- iOS: changed the [startDecoder] function.

### Added
- Added the initFunction to iOS

## [1.0.6] - 2019-04-01
### Added
- Added the function to init the CaptureID plugin. There are some problems with the Android-Runtime-Permissions. When the function [initCaptureID] get called, there successcallback get called, when the permissions are granted. If the user denies a permission, the error-callback gets called. 


## [1.0.5] - 2019-03-29
### Changed
- Changed the CaptureID-Library-Android to version: 1.0.7
- Changed the CaptureID-Class to be compatible with Java 1_6 

## [1.0.4] - 2019-03-28
### Changed
- Changed the CaptureID-Library-Android to version: 1.0.6

## [1.0.3] - 2019-03-28
### Changed
- Changed the CaptureID-Library-iOS to version: 1.0.1

## [1.0.2] - 2019-03-28
### Changed
- Changed the CaptureID-Library-Android to version: 1.5


## [1.0.1] - 2019-03-26
### Changed
- PluginID to : "cordova-plugin-captureid"
