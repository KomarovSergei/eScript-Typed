// only checks tips
let App1 = TheApplication().GetProfileAttr("1");
let App2 = TheApplication().SetProfileAttr("key", "value");
let App3 = TheApplication().Trace("1");
let App4 = TheApplication().TraceOff();
let App5 = TheApplication().TraceOn("1", "2", "3");
let App6 = TheApplication().PositionId();
let App7 = TheApplication().PositionName();
let App8 = TheApplication().LoginId();
let App9 = TheApplication().LoginName();
let App10 = TheApplication().InvokeMethod("1");
let App11 = TheApplication().GetBusObject("1");
let App12 = TheApplication().GetService("1")
let App13 = TheApplication().NewPropertySet();