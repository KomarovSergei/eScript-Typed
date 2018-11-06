// Type definitions for [Siebel eScript] [0.0.1]
// Project: [eScript-Typed]
// Definitions by: [Komarov Sergei] <komarovs33@mail.ru>
/// <reference path="./Constants.ts" />
/// <reference path="./Types.ts" />
/// <reference path="./Service.ts" />
/// <reference path="./PropertySet.ts" />

declare function TheApplication():_App;

// Main Siebel Class -->
/**не использовать! только для внутреннего использования */
declare class _App {
    /**получение профайл атрибута */
    GetProfileAttr(name: string): string | null;
    /**установка профайл атрибута */
    SetProfileAttr(name: string, value: string): void;
    /**вывести сообщение в файл трассировки */
    Trace(key: string): void;
    /**отключить трассировку */
    TraceOff(): void;
    /**включить трассировку в файл */
    TraceOn(key1: string, key2: string, key3: string): void;
    /**получить id текущей позиции пользователя */
    PositionId(): string | null;
    /**получить название текущей позиции пользователя */
    PositionName(): string | null;
    /** получить id текущего пользователя*/
    LoginId(): string | null;
    /** получить имя текущего пользователя*/
    LoginName(): string | null;
    /** вызвать метод*/
    InvokeMethod(name: string): void | null | PropertySet;
    /** получить BO*/
    GetBusObject(name: string): BusObject | null;
    /** получить BS*/
    GetService(name: string): Service | null;
    /** получить PS*/
    NewPropertySet(): PropertySet;
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
// End Main Siebel Class <--