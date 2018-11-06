//--------tests------
var BO: BusObject = TheApplication().GetBusObject("");
var svc: Service = TheApplication().GetService("");
var psInput: PropertySet = TheApplication().NewPropertySet();
var psOutput: PropertySet = TheApplication().NewPropertySet();
psInput.SetProperty("", "");
psInput.SetProperty("", "");
svc.InvokeMethod("", psInput, psOutput);