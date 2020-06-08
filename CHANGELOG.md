# Changelog
 All notable changes to this project will be documented in this file.
 The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

### [2.1.0] - 2020-06-08
### Added
- Support for sticky-pdp-buttons extension. See new `useWithStickyButtons` config.

### [2.0.2] - 2019-11-05
### Fixed
- Updated button shadow to use theme configuration value for PWA 6.9.0

### [2.0.1] - 2019-09-03
### Fixed
- Updated position of Share Button on iOS to reflect PWA 6.7 changes

### [2.0.0] - 2018-01-17
Major version update.
### Added
- Updated styling for Share Buttons to reflect PWA 6 changes
- Updated connector to receive props for getCurrentProduct selector.

### [1.0.0] - 2018-10-26
First version of the extension.
### Added
- Added Share Button to products details page that will launch an app command for Native Share feature for iOS and Android
- You can configure which svg image is shown for each theme via the Connect Merchant Admin. Example config:
```json
{
  "iOSIcon": "ios", // iOS theme will show ios like icon
  "gmdIcon": "gmd" // gmd theme will show gmd icon
}

```

## [0.0.1] - 2018-10-11
### Added
Inital Commit.

[1.0.0]: https://github.com/shopgate/ext-pdp-native-share/compare/v0.0.1...v1.0.0
