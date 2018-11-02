// Type definitions for [Siebel eScript] [0.0.1]
// Project: [eScript-Typed]
// Definitions by: [Komarov Sergei] <komarovs33@mail.ru>

declare function TheApplication():_App;

// interfaces or types to enable escript typing -->
declare interface BusObj {
}

declare type Service = any
// typing end <--

// declare siebel consts -->
//SetViewMode
declare const SalesRepView: number;
declare const OrganizationView: number;
declare const ManagerView: number;
declare const GroupView: number;
declare const PersonalView: number;
declare const CatalogView: number;
declare const AllView: number;
declare const SubOrganizationView: number;
//ExecuteQuery constants
declare let ForwardOnly: boolean;
declare let ForwardBackward: boolean;
declare let NewAfter: boolean;
declare let NewBefore: boolean;
// 
/**переменная для продолжения выполнения скрипта */
declare let ContinueOperation: boolean;
/**переменная для прерывания выполнения скрипта */
declare let CancelOperation: boolean;
/** дефолтный PS на вход */
declare let Inputs: PropertySet;
/** дефолтный PS на выход */
declare let Outputs: PropertySet;
/** параметр имя метода */
declare let Method: string;
// end siebel consts <--

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
    GetBusObject(name: string): GetBusObject | null;
    /** получить BS*/
    GetService(name: string): GetService | null;
    /** получить PS*/
    NewPropertySet(): PropertySet;
}

/**класс для Siebel BO */
declare class GetBusObject{
    Name(): string | null;
    GetBusComp(name: string): GetBusComp | null;
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

// End Main Siebel Class <--