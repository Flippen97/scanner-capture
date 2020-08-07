
var exec = require('cordova/exec');

function Property(key, name, value, type) {
    this.key = key;
    this.name = name;
    this.value = value;
    this.type = type;
}

function Symbologies() {
    Symbologies.prototype.AustraliaPostProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.AztecProperties = function () {
        var polarity = new AztecPropertiesPolarity();
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("mirrorDecodingEnabled", "mirrorDecodingEnabled", false, "boolean"));
        props.push(new Property("polarity", polarity.AztecPropertiesPolarity_DarkOnLight + ";" + polarity.AztecPropertiesPolarity_Either + ";" + polarity.AztecPropertiesPolarity_LightOnDark, polarity.AztecPropertiesPolarity_DarkOnLight, "enum"));
        return props;
    };

    function AztecPropertiesPolarity() {
        AztecPropertiesPolartiy.prototype.AztecPropertiesPolarity_DarkOnLight = "AztecPropertiesPolarity_DarkOnLight";
        AztecPropertiesPolartiy.prototype.AztecPropertiesPolarity_Either = "AztecPropertiesPolarity_Either";
        AztecPropertiesPolartiy.prototype.AztecPropertiesPolarity_LightOnDark = "AztecPropertiesPolarity_LightOnDark";
    }

    Symbologies.prototype.BC412Properties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.CanadaPostProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.CodabarProperties = function () {
        var chksum = new CodabarPropertiesChecksum();
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("stripStartStopCharactersEnabled", "stripStartStopCharactersEnabled", false, "boolean"));
        props.push(new Property("checksumProperties", chksum.CodabarPropertiesChecksum_Disabled + ";" + chksum.CodabarPropertiesChecksum_Enabled + ";" + chksum.CodabarPropertiesChecksum_EnabledStripCheckCharacter, chksum.CodabarPropertiesChecksum_Disabled, "enum"));
        return props;
    };

    function CodabarPropertiesChecksum() {
        CodabarPropertiesChecksum.prototype.CodabarPropertiesChecksum_Disabled = "CodabarPropertiesChecksum_Disabled";
        CodabarPropertiesChecksum.prototype.CodabarPropertiesChecksum_Enabled = "CodabarPropertiesChecksum_Enabled";
        CodabarPropertiesChecksum.prototype.CodabarPropertiesChecksum_EnabledStripCheckCharacter = "CodabarPropertiesChecksum_EnabledStripCheckCharacter";
    }

    Symbologies.prototype.CodablockFProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    function Code11PropertiesChecksum() {
        Code11PropertiesChecksum.prototype.Code11PropertiesChecksum_Disabled = "Code11PropertiesChecksum_Disabled";
        Code11PropertiesChecksum.prototype.Code11PropertiesChecksum_Enabled1Digit = "Code11PropertiesChecksum_Enabled1Digit";
        Code11PropertiesChecksum.prototype.Code11PropertiesChecksum_Enabled2Digit = "Code11PropertiesChecksum_Enabled2Digit";
    };

    Symbologies.prototype.Code11Properties = function () {
        var chksum = new Code11PropertiesChecksum();
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("stripChecksumDigitsEnabled", "stripChecksumDigitsEnabled", false, "boolean"));
        props.push(new Property("checksumProperties", chksum.Code11PropertiesChecksum_Disabled + ";" + chksum.Code11PropertiesChecksum_Enabled1Digit + ";" + chksum.Code11PropertiesChecksum_Enabled2Digit, chksum.Code11PropertiesChecksum_Disabled, "enum"));
        return props;
    };

    Symbologies.prototype.Code128Properties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.Code32Properties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.Code39Properties = function () {
        var chksum = new Code39PropertiesChecksum();
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("asciiModeEnabled", "asciiModeEnabled", false, "boolean"));
        props.push(new Property("stripStartStopCharactersEnabled", "stripStartStopCharactersEnabled", false, "boolean"));
        props.push(new Property("checksumProperties", chksum.Code39PropertiesChecksum_Disabled + ";" + chksum.CodabarPropertiesChecksum_Enabled + ";" + chksum.Code39PropertiesChecksum_EnabledStripCheckCharacter, chksum.Code39PropertiesChecksum_Disabled, "enum"));
        return props;
    };

    function Code39PropertiesChecksum() {
        Code39PropertiesChecksum.prototype.Code39PropertiesChecksum_Disabled = "Code39PropertiesChecksum_Disabled";
        Code39PropertiesChecksum.prototype.Code39PropertiesChecksum_Enabled = "Code39PropertiesChecksum_Enabled";
        Code39PropertiesChecksum.prototype.Code39PropertiesChecksum_EnabledStripCheckCharacter = "Code39PropertiesChecksum_EnabledStripCheckCharacter";
    };

    Symbologies.prototype.Code49Properties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.Code93Properties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        // -- Version 1.0.25 EDK 2.0.1
        props.push(new Property("minChars", "minChars", 0, "integer"));
        return props;
    };

    Symbologies.prototype.DataMatrixProperties = function () {
        var polarity = new DataMatrixPropertiesPolarity();
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("extendedRectEnabled", "extendedRectEnabled", false, "boolean"));
        props.push(new Property("mirrorDecodingEnabled", "mirrorDecodingEnabled", false, "boolean"));
        props.push(new Property("polarity", polarity.DataMatrixPropertiesPolarity_DarkOnLight + ";" + polarity.DataMatrixPropertiesPolarity_Either + ";" + polarity.DataMatrixPropertiesPolarity_LightOnDark, polarity.DataMatrixPropertiesPolarity_DarkOnLight, "enum"));
        return props;
    };

    function DataMatrixPropertiesPolarity() {
        DataMatrixPropertiesPolarity.prototype.DataMatrixPropertiesPolarity_DarkOnLight = "DataMatrixPropertiesPolarity_DarkOnLight";
        DataMatrixPropertiesPolarity.prototype.DataMatrixPropertiesPolarity_Either = "DataMatrixPropertiesPolarity_Either";
        DataMatrixPropertiesPolarity.prototype.DataMatrixPropertiesPolarity_LightOnDark = "DataMatrixPropertiesPolarity_LightOnDark";
    };

    function DLProperties() {
        DLProperties.prototype.DLProperties_Disabled = "DLProperties_Disabled";
        DLProperties.prototype.DLProperties_Enabled = "DLProperties_Enabled";
    };

    Symbologies.prototype.DutchPostProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.EAN13Properties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("stripCheckDigitEnabled", "stripCheckDigitEnabled", false, "boolean"));
        // -- Version 1.0.25 EDK 2.0.1
        //props.push(new Property("supplementalDecodingEnabled", "supplementalDecodingEnabled", false, "boolean"));
        props.push(new Property("addSpaceEnabled", "addSpaceEnabled", false, "boolean"));
        props.push(new Property("requireSupplemental", "requireSupplemental", false, "boolean"));
        props.push(new Property("supplemental2DigitDecodingEnabled", "supplemental2DigitDecodingEnabled", false, "boolean"));
        props.push(new Property("supplemental5DigitDecodingEnabled", "supplemental5DigitDecodingEnabled", false, "boolean"));
        props.push(new Property("stripCheckDigitEnabled", "stripCheckDigitEnabled", false, "boolean"));
        return props;
    }

    Symbologies.prototype.EAN8Properties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("convertToEAN13Enabled", "convertToEAN13Enabled", false, "boolean"));
        props.push(new Property("stripCheckDigitEnabled", "stripCheckDigitEnabled", false, "boolean"));
        // -- Version 1.0.25 EDK 2.0.1
        //props.push(new Property("supplementalDecodingEnabled", "supplementalDecodingEnabled", false, "boolean"));
        props.push(new Property("addSpaceEnabled", "addSpaceEnabled", false, "boolean"));
        props.push(new Property("requireSupplemental", "requireSupplemental", false, "boolean"));
        props.push(new Property("supplemental2DigitDecodingEnabled", "supplemental2DigitDecodingEnabled", false, "boolean"));
        props.push(new Property("supplemental5DigitDecodingEnabled", "supplemental5DigitDecodingEnabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.GoCodeProperties = function () {
        var polarity = new GoCodePropertiesPolarity();
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("polarity", polarity.GoCodePropertiesPolarity_DarkOnLight + ";" + polarity.GoCodePropertiesPolarity_Either + ";" + polarity.GoCodePropertiesPolarity_LightOnDark, polarity.GoCodePropertiesPolarity_DarkOnLight, "enum"));
        return props;
    };

    function GoCodePropertiesPolarity() {
        GoCodePropertiesPolarity.prototype.GoCodePropertiesPolarity_DarkOnLight = "GoCodePropertiesPolarity_DarkOnLight";
        GoCodePropertiesPolarity.prototype.GoCodePropertiesPolarity_Either = "GoCodePropertiesPolarity_Either";
        GoCodePropertiesPolarity.prototype.GoCodePropertiesPolarity_LightOnDark = "GoCodePropertiesPolarity_LightOnDark";
    };

    Symbologies.prototype.GridMatrixProperties = function () {
        var polarity = new GridMatrixPropertiesPolarity();
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("mirrorDecodingEnabled", "mirrorDecodingEnabled", false, "boolean"));
        props.push(new Property("polarity", polarity.GridMatrixPropertiesPolarity_DarkOnLight + ";" + polarity.GridMatrixPropertiesPolarity_Either + ";" + polarity.GridMatrixPropertiesPolarity_LightOnDark, polarity.GridMatrixPropertiesPolarity_DarkOnLight, "enum"));
        return props;
    };

    function GridMatrixPropertiesPolarity() {
        GridMatrixPropertiesPolarity.prototype.GridMatrixPropertiesPolarity_DarkOnLight = "GridMatrixPropertiesPolarity_DarkOnLight";
        GridMatrixPropertiesPolarity.prototype.GridMatrixPropertiesPolarity_Either = "GridMatrixPropertiesPolarity_Either";
        GridMatrixPropertiesPolarity.prototype.GridMatrixPropertiesPolarity_LightOnDark = "GridMatrixPropertiesPolarity_LightOnDark";
    };

    Symbologies.prototype.GS1DataBar14Properties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("ccaDecodingEnabled", "ccaDecodingEnabled", false, "boolean"));
        props.push(new Property("ccbDecodingEnabled", "ccbDecodingEnabled", false, "boolean"));
        props.push(new Property("cccDecodingEnabled", "cccDecodingEnabled", false, "boolean"));
        props.push(new Property("expandedDecodingEnabled", "expandedDecodingEnabled", false, "boolean"));
        props.push(new Property("expandedStackDecodingEnabled", "expandedStackDecodingEnabled", false, "boolean"));
        props.push(new Property("limitedDecodingEnabled", "limitedDecodingEnabled", false, "boolean"));
        props.push(new Property("stackedDecodingEnabled", "stackedDecodingEnabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.HanXinCodeProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.HongKong2of5Properties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        // -- Version 1.0.25 EDK 2.0.1
        props.push(new Property("checksumProperties", chksum.Interleaved2of5PropertiesChecksum_Disabled + ";" + chksum.Interleaved2of5PropertiesChecksum_Enabled + ";" + chksum.Interleaved2of5PropertiesChecksum_EnabledStripCheckCharacter, chksum.Interleaved2of5PropertiesChecksum_Disabled, "enum"));
        return props;
    };

    Symbologies.prototype.IATA2of5Properties = function () {
        var chksum = new Symbology2of5PropertiesChecksum();
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("checksumProperties", chksum.Checksum_Disabled + ";" + chksum.Checksum_Enabled + ";" + chksum.Checksum_EnabledStripCheckCharacter, chksum.Checksum_Disabled, "enum"));
        // -- Version 1.0.25 EDK 2.0.1
        props.push(new Property("minChars", "minChars", 0, "integer"));
        return props;
    };

    Symbologies.prototype.Interleaved2of5Properties = function () {
        var chksum = new Interleaved2of5PropertiesChecksum();
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("checksumProperties", chksum.Interleaved2of5PropertiesChecksum_Disabled + ";" + chksum.Interleaved2of5PropertiesChecksum_Enabled + ";" + chksum.Interleaved2of5PropertiesChecksum_EnabledStripCheckCharacter, chksum.Interleaved2of5PropertiesChecksum_Disabled, "enum"));
        // -- Version 2.0.4
        // props.push(new Property("quietZone", "quietZone", 0, "integer"));
        props.push(new Property("allowShortQuietZone", "allowShortQuietZone", false, "boolean"));
        props.push(new Property("minChars", "minChars", 0, "integer"));
        props.push(new Property("rejectPartialDecode", "rejectPartialDecode", false, "boolean"));
        return props;
    };

    function Interleaved2of5PropertiesChecksum() {
        Interleaved2of5PropertiesChecksum.prototype.Interleaved2of5PropertiesChecksum_Disabled = "Interleaved2of5PropertiesChecksum_Disabled";
        Interleaved2of5PropertiesChecksum.prototype.Interleaved2of5PropertiesChecksum_Enabled = "Interleaved2of5PropertiesChecksum_Enabled";
        Interleaved2of5PropertiesChecksum.prototype.Interleaved2of5PropertiesChecksum_EnabledStripCheckCharacter = "Interleaved2of5PropertiesChecksum_EnabledStripCheckCharacter";
    };

    Symbologies.prototype.JapanPostProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.KoreaPostProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.Matrix2of5Properties = function () {
        var chksum = new Symbology2of5PropertiesChecksum();
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("checksumProperties", chksum.Checksum_Disabled + ";" + chksum.Checksum_Enabled + ";" + chksum.Checksum_EnabledStripCheckCharacter, chksum.Checksum_Disabled, "enum"));
        return props;
    };

    Symbologies.prototype.MaxiCodeProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.MicroPDF417Properties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.MicroQRProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.MSIPlesseyProperties = function () {
        var chksum = new MSIPlesseyPropertiesChecksum();
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("stripChecksumEnabled", "stripChecksumEnabled", false, "boolean"));
        props.push(new Property("checksumProperties", chksum.MSIPlesseyPropertiesChecksum_Disabled + ";" + chksum.MSIPlesseyPropertiesChecksum_EnabledMod10 + ";" + chksum.MSIPlesseyPropertiesChecksum_EnabledMod10_10 + ";" + chksum.MSIPlesseyPropertiesChecksum_EnabledMod11_10, chksum.MSIPlesseyPropertiesChecksum_Disabled, "enum"));
        // -- Version 1.0.25 EDK 2.0.1
        props.push(new Property("minChars", "minChars", 0, "integer"));
        return props;
    };

    function MSIPlesseyPropertiesChecksum() {
        MSIPlesseyPropertiesChecksum.prototype.MSIPlesseyPropertiesChecksum_Disabled = "MSIPlesseyPropertiesChecksum_Disabled";
        MSIPlesseyPropertiesChecksum.prototype.MSIPlesseyPropertiesChecksum_EnabledMod10 = "MSIPlesseyPropertiesChecksum_EnabledMod10";
        MSIPlesseyPropertiesChecksum.prototype.MSIPlesseyPropertiesChecksum_EnabledMod10_10 = "MSIPlesseyPropertiesChecksum_EnabledMod10_10";
        MSIPlesseyPropertiesChecksum.prototype.MSIPlesseyPropertiesChecksum_EnabledMod11_10 = "MSIPlesseyPropertiesChecksum_EnabledMod11_10";
    };

    Symbologies.prototype.NEC2of5Properties = function () {
        var chksum = new Symbology2of5PropertiesChecksum();
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("checksumProperties", chksum.Checksum_Disabled + ";" + chksum.Checksum_Enabled + ";" + chksum.Checksum_EnabledStripCheckCharacter, chksum.Checksum_Disabled, "enum"));
        return props;
    };

    Symbologies.prototype.PDF417Properties = function () {
        var parsing = new DLProperties();
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        // -- Version 1.0.25 EDK 2.0.1
        //props.push(new Property("dlParsing", parsing.DLProperties_Disabled + ";" + parsing.DLProperties_Enabled, parsing.DLProperties_Disabled, "enum"));
        return props;
    };

    Symbologies.prototype.PharmacodeProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("maximumBars", "maximumBars", 0, "integer"));
        props.push(new Property("maximumValue", "maximumValue", 0, "integer"));
        props.push(new Property("minimumBars", "minimumBars", 0, "integer"));
        props.push(new Property("minimumValue", "minimumValue", 0, "integer"));
        return props;
    };

    Symbologies.prototype.PlesseyProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.QRProperties = function () {
        var polarity = new QRPropertiesPolarity();
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("mirrorDecodingEnabled", "mirrorDecodingEnabled", false, "boolean"));
        props.push(new Property("model1DecodingEnabled", "model1DecodingEnabled", false, "boolean"));
        props.push(new Property("polarity", polarity.QRPropertiesPolarity_DarkOnLight + ";" + polarity.QRPropertiesPolarity_Either + ";" + polarity.QRPropertiesPolarity_LightOnDark, polarity.QRPropertiesPolarity_DarkOnLight, "enum"));
        return props;
    };

    function QRPropertiesPolarity() {
        QRPropertiesPolarity.prototype.QRPropertiesPolarity_DarkOnLight = "QRPropertiesPolarity_DarkOnLight";
        QRPropertiesPolarity.prototype.QRPropertiesPolarity_Either = "QRPropertiesPolarity_Either";
        QRPropertiesPolarity.prototype.QRPropertiesPolarity_LightOnDark = "QRPropertiesPolarity_LightOnDark";
    };

    Symbologies.prototype.RoyalMailProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.Straight2of5Properties = function () {
        var chksum = new Symbology2of5PropertiesChecksum();
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("checksumProperties", chksum.Checksum_Disabled + ";" + chksum.Checksum_Enabled + ";" + chksum.Checksum_EnabledStripCheckCharacter, chksum.Checksum_Disabled, "enum"));
        return props;
    };

    function Symbology2of5PropertiesChecksum() {
        Symbology2of5PropertiesChecksum.prototype.Checksum_Disabled = "Checksum_Disabled";
        Symbology2of5PropertiesChecksum.prototype.Checksum_Enabled = "Checksum_Enabled";
        Symbology2of5PropertiesChecksum.prototype.Checksum_EnabledStripCheckCharacter = "Checksum_EnabledStripCheckCharacter";
    };

    Symbologies.prototype.TelepenProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.TriopticProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("stripStartStopCharactersEnabled", "stripStartStopCharactersEnabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.UPCAProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("convertToEAN13Enabled", "convertToEAN13Enabled", false, "boolean"));
        props.push(new Property("stripCheckDigitEnabled", "stripCheckDigitEnabled", false, "boolean"));
        props.push(new Property("stripUPCASystemNumberDigitEnabled", "stripUPCASystemNumberDigitEnabled", false, "boolean"));
        // -- Version 1.0.25 EDK 2.0.1
        //props.push(new Property("supplementalDecodingEnabled", "supplementalDecodingEnabled", false, "boolean"));
        props.push(new Property("addSpaceEnabled", "addSpaceEnabled", false, "boolean"));
        props.push(new Property("requireSupplemental", "requireSupplemental", false, "boolean"));
        props.push(new Property("supplemental2DigitDecodingEnabled", "supplemental2DigitDecodingEnabled", false, "boolean"));
        props.push(new Property("supplemental5DigitDecodingEnabled", "supplemental5DigitDecodingEnabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.UPCEProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("expansionEnabled", "expansionEnabled", false, "boolean"));
        props.push(new Property("stripCheckDigitEnabled", "stripCheckDigitEnabled", false, "boolean"));
        props.push(new Property("stripUPCESystemNumberDigitEnabled", "stripUPCESystemNumberDigitEnabled", false, "boolean"));
        // -- Version 1.0.25 EDK 2.0.1
        //props.push(new Property("supplementalDecodingEnabled", "supplementalDecodingEnabled", false, "boolean"));
        props.push(new Property("supplemental2DigitDecodingEnabled", "supplemental2DigitDecodingEnabled", false, "boolean"));
        props.push(new Property("supplemental5DigitDecodingEnabled", "supplemental5DigitDecodingEnabled", false, "boolean"));
        props.push(new Property("addSpaceEnabled", "addSpaceEnabled", false, "boolean"));
        props.push(new Property("requireSupplemental", "requireSupplemental", false, "boolean"));
        return props;
    };

    Symbologies.prototype.UPUProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.USPSIntelligentMailProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.USPSPlanetProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.USPSPostnetProperties = function () {
        var props = [];
        props.push(new Property("enabled", "enabled", false, "boolean"));
        return props;
    };

    Symbologies.prototype.DotCodeProperties = function () {
        var props = [];
        var polarity = new DotCodePolarity();
        props.push(new Property("enabled", "enabled", false, "boolean"));
        props.push(new Property("mirrorDecodingEnabled", "mirrorDecodingEnabled", false, "boolean"));
        props.push(new Property("polarity", polarity.DotCodePolarity_DarkOnLight + ";" + polarity.DotCodePolarity_Either + ";" + polarity.DotCodePolarity_LightOnDark, polarity.DotCodePolarity_DarkOnLight, "enum"));
        return props;
    };

    function DotCodePolarity() {
        DotCodePolarity.prototype.DotCodePolarity_DarkOnLight = "DotCodePropertiesPolarity_DarkOnLight";
        DotCodePolarity.prototype.DotCodePolarity_Either = "DotCodePropertiesPolarity_Either";
        DotCodePolarity.prototype.DotCodePolarity_LightOnDark = "DotCodePropertiesPolarity_LightOnDark";
    };
};
var symbologies = new Symbologies();
module.exports = symbologies;