// Node Modules
const papaparse = require("papaparse");
const flatten = require("flat");
const { parseString, Builder } = require("xml2js");
const debug = require("debug")("mosaic:transform");

class Transform{
  constructor(data, options){
    this.data = data;
    this.isArray = false;
    this.options = options;
    // TODO: Check dataType
    this.supportedTransformations = ["csv", "json", "xml"];
    if(typeof data === "object" && data.length) this.isArray = true
  }
  from(from) {
    // Check for destination
    if (!from) throw new Error("Missing/Invalid value for .from");
    // Check for supported destinations
    if (!this.supportedTransformations.includes(from)) throw new Error("Invalid value for .from. Supported values are csv, json, xml");
    // Check if destination is set
    if (this.destination) throw new Error(".from must be called before .to");
    // Format data
    switch (from) {
      case "json": 
        if(typeof this.data === "string") this.data = JSON.parse(this.data);
        if(this.data.length) this.isArray = true;
      break;
    }
    this.origin = from;
    return this;
  }
  to(to){
    // Check for destination
    if(!to) throw new Error("Missing value for .to");
    // Check for supported destinations
    if (!this.supportedTransformations.includes(to)) throw new Error("Invalid value for .to. Supported values are csv, json, xml");
    // Check for origin
    if (!this.origin) throw new Error(".from must be called before .to");
    // Return original value if origin and destination match
    if(this.destination === this.origin) return this.data

    this.destination = to;

    debug(this.origin, "->", this.destination);
    switch (this.destination) {
      case "json": return this.toJSON();
      case "xml": return this.toXML();
      case "csv": return this.toCSV();
    }
  }
  options(options){
    this.options = options;
    return this
  }
  toJSON(){
    debug("toJSON");
    switch (this.origin) {
      case "xml": 
        var xml;
        parseString(this.data, { explicitArray: false, attrkey: "@" }, (err, result) => {
          if (err) throw (err);
          xml = result;
        });
        return xml;
      case "csv": 
        return papaparse.parse(this.data.trim(), { header: true, trimHeader: true, ...this.options });
    }
  }
  toXML(){
    debug("toXML");
    switch (this.origin) {
      case "json":
        return new Builder({...this.options, attrkey: "@" }).buildObject(this.data)
      case "csv":
        return
    }
  }
  toCSV(){
    debug("toCSV");
    switch (this.origin) {
      case "json":
        if (this.isArray) return papaparse.unparse(this.data.map(flatten), this.options)
        return papaparse.unparse(flatten(this.data), this.options)
      case "xml":
        // TODO: Finish
        // Convert to json
        const json = this.toJSON();
        // convert to csv
        if (this.isArray) return papaparse.unparse(json.map(flatten), this.options)
        return papaparse.unparse(flatten(json), this.options)
    }
  }
  list(){
    return [

    ]
  }
}

module.exports =  Transform;