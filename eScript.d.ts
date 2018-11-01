// Type definitions for [Siebel eScript] [0.0.1]
// Project: [eScript]
// Definitions by: [Komarov Sergei] <komarovs33@mail.ru>

declare function TheApplication(): { GetProfileAttr(n: string): void; SetProfileAttr(n: string, s: string): void; Trace(); TraceOff(); PositionId(); PositionName(); LoginId(); LoginName(); InvokeMethod(); GetBusObject(): GetBusObject; GetService(): GetService; NewPropertySet(): PropertySet; }

// interfaces or types to enable escript typing
declare interface BusObj {
}

declare type Service = any
// typing end 

declare class GetBusObject{
    Name()
    GetBusComp(): GetBusComp
}

declare class GetService {
    Name()
    InvokeMethod()
    PropertyExists()
    GetProperty()
    SetProperty()
}

declare class GetBusComp {
    Name()
    ActivateField()
    ActivateMultipleFields()
    Associate()
    ClearToQuery()
    CountRecords()
    DeactivateFields()
    DeleteRecord()
    ExecuteQuery()
    FirstRecord()
    GetAssocBusComp()
    GetFieldValue()
    GetFormattedFieldValue()
    GetMVGBusComp(): GetMVGBusComp
    GetNamedSearch()
    GetPicklistBusComp()
    GetSearchExpr()
    GetSearchSpec()
    GetViewMode()
    InvokeMethod()
    LastRecord()
    NewRecord()
    NextRecord()
    ParentBusComp()
    Pick()
    PreviousRecord()
    RefineQuery()
    SearchExpr()
    SetFieldValue()
    SetFormattedFieldValue()
    SetSearchSpec()
    SetSearchExpr()
    SetSortSpec()
    SetViewMode()
    UndoRecord()
    ViewMode()
    WriteRecord()
}

declare class GetMVGBusComp {
    Name()
    ActivateField()
    ActivateMultipleFields()
    Associate()
    ClearToQuery()
    CountRecords()
    DeactivateFields()
    DeleteRecord()
    ExecuteQuery()
    FirstRecord()
    GetAssocBusComp(): GetAssocBusComp
    GetFieldValue()
    GetFormattedFieldValue()
    GetNamedSearch()
    GetPicklistBusComp()
    GetSearchExpr()
    GetSearchSpec()
    GetViewMode()
    InvokeMethod()
    LastRecord()
    NewRecord()
    NextRecord()
    ParentBusComp()
    Pick()
    PreviousRecord()
    RefineQuery()
    SearchExpr()
    SetFieldValue()
    SetFormattedFieldValue()
    SetSearchSpec()
    SetSearchExpr()
    SetSortSpec()
    SetViewMode()
    UndoRecord()
    ViewMode()
    WriteRecord()
}

declare class GetAssocBusComp {
    Class()
    Name()
    ActivateField()
    ActivateMultipleFields()
    Associate()
    ClearToQuery()
    CountRecords()
    DeactivateFields()
    DeleteRecord()
    ExecuteQuery()
    FirstRecord()
    GetAssocBusComp()
    GetFieldValue()
    GetFormattedFieldValue()
    GetAssocBusComp()
    GetNamedSearch()
    GetPicklistBusComp()
    GetSearchExpr()
    GetSearchSpec()
    GetViewMode()
    InvokeMethod()
    LastRecord()
    NewRecord()
    NextRecord()
    ParentBusComp()
    Pick()
    PreviousRecord()
    RefineQuery()
    SearchExpr()
    SetFieldValue()
    SetFormattedFieldValue()
    SetSearchSpec()
    SetSearchExpr()
    SetSortSpec()
    SetViewMode()
    UndoRecord()
    ViewMode()
    WriteRecord()
}

declare class PropertySet {
    PropertyExists()
    GetProperty()
    SetProperty()
    GetValue()
    SetValue()
    GetType()
    SetType()
    Copy()
    Reset()
    GetChild()
    AddChild()
    RemoveChild()
    RemoveProperty()
    GetFirstProperty()
    GetNextProperty()
    GetPropertyCount()
}