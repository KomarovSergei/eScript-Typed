// Type definitions for [Siebel eScript] [0.0.1]
// Project: [eScript-Typed]
// Definitions by: [Komarov Sergei] <komarovs33@mail.ru>
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
declare let ForwardOnly: number;
declare let ForwardBackward: number;
declare let NewAfter: number;
declare let NewBefore: number;
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
// types to enable escript typing

declare type chars = string;
// @ts-ignore
declare type String = string;
declare type bool = boolean;
declare type float = number;

declare type BusObject = iBusObject;
declare type BusComp = iBusComp;
declare type Service = iService;
declare type PropertySet = iPropertySet;
/** Only for internal use! */
declare interface _App {

    /** Gets the name of the active view*/
    ActiveViewName(): chars

    /** Gets the business object for the business component of
     *  the active applet. */
    ActiveBusObject(): BusObject

    /** Gets the operating currency code associated with the division to which
     *  the user's position has been assigned.*/
    CurrencyCode(): chars

    /** Gets a new instance of the business object specified. */
    GetBusObject(busObjName: chars): BusObject

    // todo add type and interface
    //GetCTIService() : CTIService

    /** Gets the value of an attribute in a user profile */
    GetProfileAttr(profAttrName: chars): chars

    /** Gets the specified service. If the service is not already instantiated,
     *  it is constructed*/
    GetService(svcName: chars): Service

    /** Gets the shared user-defined global variables */
    GetSharedGlobal(shGlobalName: chars): chars

    /** GotoView activates the named view and its BusObject */
    GotoView(viewName: chars, busObjName: chars)

    /** Calls a specialized method or user-defined method specified by
     *  its argument */
    InvokeMethod(methodName: chars, param1: chars | null, param2: chars | null): chars

    /** Returns the login id of the user who started the Siebel applications */
    LoginId(): chars

    /** returns the login name of the user who started the Siebel application 
     * (the name typed in the login dialog box) */
    loginName(): chars

    /** Returns the translated string for the specified key, in the current 
     * language, from the specified category. The optional arguments are used
     *  to format the string if it contains any substitution arguments (%1,%2).
     * */
    LookupMessage(category, key, arg1: chars, arg2: chars | null,
        argN: chars | null): chars

    /** Constructs a new property set object */
    NewPropertySet(): PropertySet

    /** Returns the position ID (ROW_ID from S_POSTN) of the user's 
     * current position*/
    PositionId(): chars

    /** Returns the position name of the user's current position. 
     * This is set by default when the Siebel application is started*/
    PositionName(): chars

    /** Raises a scripting error message to the browser. The error code is a 
     * canonical number. The error text is based on the specified key,
     *  looked up for the current language from the User-Defined Errors
     *  category. You can define these errors in Tools using 
     * the Message Category object. The optional arguments are used to 
     * format the string if it contains any substitution arguments (%1, %2)*/
    RaiseError(key: chars, subVal1: chars | null, subValN: chars | null): void

    /** Raises a scripting error message to the browser. The error text is the
     *  specified literal string. The optional arguments are used to format
     *  the string if it contains any substitution arguments (%1, %2)*/
    RaiseErrorText(message: chars): void

    /** Sets the active position to the Position Id specified in the argument.*/
    SetPositionId(positionId: chars): bool

    /** Changes the position of the current user to the value specified in 
     * the input argument. For SetPositionName() to succeed, the user must be 
     * assigned to the position to which the user is changing.*/
    SetPositionName(positionName: chars): bool

    /** Used in personalization to assign values to attributes in a 
     * user profile*/
    SetProfileAttr(profAttrName: chars, profAttrValue: chars): void

    /** Sets a shared user-defined global variable*/
    SetSharedGlobal(shGlobalName: chars, shGlobalValue: chars): void

    /** Appends a message to the trace file */
    Trace(message: chars): void

    /** Turns on the tracking of allocations and deallocations of Siebel objects
     *  and SQL statements generated by the Siebel application*/
    TraceOn(fName: chars, type: chars, selection: chars): void

    /** Turns off the tracing started by the TraceOn method */
    TraceOff(): void
}

declare function TheApplication(): _App;
declare interface iBusComp {

    /** Activates the specified business component field */
    ActivateField(fieldName: chars): void

    /** Activates one or more business component field as specified 
     * in the property set */
    ActivateMultipleFields(fields: PropertySet): void

    /** Creates a many-to-many relationship for the parent object 
     * through an association business component */
    Associate(position: float): void

    /** Returns the business object that contains the business component */
    BusObject(): BusObject

    /** Clears the current query  but does not clear sort specifications 
     * on the BusComp*/
    ClearToQuery(): void

    /** Number of records returned by the buscomp */
    CountRecords(): float

    /** Deactivates the fields that are currently active from 
     * a business component SQL query statement, except those that are 
     * not ForceActive, required for a link, or required by the BusComp class */
    DeactivateFields(): void

    /** Removes the current record from the business component */
    DeleteRecord(): void

    /** Returns a set of BusComp records using the criteria established with 
     * methods such as SetSearchSpec or SetSearchExpr */
    ExecuteQuery(cursorMode: float): void

    /** Returns a set of BusComp records using the criteria established with
     *  methods such as SetSearchSpec or SetSearchExpr*/
    ExecuteQuery2(cursorMode: float, ignoreMaxCursorSize: bool): void

    /** Moves the record pointer to the first record in a business component,
     *  making that record current and invoking any associated script events*/
    FirstRecord(): bool

    /**  Moves the focus to the first record of the multiple selection 
     * in the business component, invoking any associated events.*/
    FirstSelected(): bool

    /** Returns the association business component. The association 
     * business component can be used to operate on the association 
     * using the normal business component mechanisms*/
    GetAssocBusComp(): BusComp

    /** Returns the value for the field specified in its argument for the
     *  current record of the business component */
    GetFieldValue(fieldName: chars): chars

    /** Returns the field value in the current local format;
     *  it returns values in the same format as the Siebel UI */
    GetFormattedFieldValue(fieldName: chars): chars

    /** Returns a value for the fields specified in the property set */
    GetMultipleFieldValues(fields: PropertySet): PropertySet

    /** Returns the MVG business component associated with the business 
     * component field specified by FieldName*/
    GetMVGBusComp(fieldName: chars): BusComp

    /** Returns the named search specification specified by searchName */
    GetNamedSearch(searchName: chars): chars

    /** Returns the pick business component associated with the specified field
     *  in the current business component*/
    GetPicklistBusComp(fieldName: chars): BusComp

    /** Returns the current search expression for the business component */
    GetSearchExpr(): chars

    /** Returns the search specification for the field specified by
     *  the FieldName argument */
    GetSearchSpec(fieldName: chars): chars

    /** Returns the value of a named user property. */
    GetUserProp(propName: chars): chars

    /** Returns the value of a named user property. */
    GetUserProperty(propName: chars): chars

    /** Returns the current visibility mode for the business component */
    GetViewMode(): float

    /** Calls the specialized method or user-created method named in the
     *  argument*/
    InvokeMethod(methodName: chars, param1: chars): chars

    /** Moves to the last record in the business component */
    LastRecord(): bool

    /** Property contains the name of the business component */
    Name(): chars

    /** NewRecord adds a new record (row) to a Siebel business component */
    NewRecord(cursorMode: string): void

    /** Moves the record pointer to the next record in the business component */
    NextRecord(): bool

    /** Moves the focus to the next record of the current multiple selection. */
    NextSelected(): bool

    /** Returns the parent (master) business component when given the child 
     * (detail) business component of a Link*/
    ParentBusComp(): BusComp

    /** Places the currently selected record in a picklist business component 
     * into the appropriate fields of the parent business component */
    Pick(): void

    /** Moves to the previous record in the business component,
     *  invoking any associated Basic events*/
    PreviousRecord(): bool

    /** Refines a query after the query has been executed */
    RefineQuery(): void

    /** Sets and gets the search specification for the business component. */
    SearchExpr(expr: chars): chars

    /** Assigns the new value to the named field for the current row of
     *  a Siebel business component*/
    SetFieldValue(fieldName: chars, fieldValue: chars): void

    /** Assigns the new value to the named field for the current row of the
     *  business component. SetFormattedFieldValue accepts the field value
     *  in the current local format*/
    SetFormattedFieldValue(fieldName: chars, fieldValue: chars): void

    /** Assigns a new value to the fields specified in the property set for 
     * the current row of the business component*/
    SetMultipleFieldValues(fields: PropertySet): void

    /** Sets a named search specification on the business component. 
     * A named search specification is identified by the searchName argument*/
    SetNamedSearch(searchName: chars, searchValue: chars): void

    /** Sets an entire search expression on the business component, rather than
     *  setting one search specification per field. Syntax is similar 
     * to that on the Predefined Queries screen*/
    SetSearchExpr(searchExpr: chars): void

    /** Sets the search specification for a particular field */
    SetSearchSpec(fieldName: chars, fieldValue: chars): void

    /** Sets the sorting specification for a query */
    SetSortSpec(sortSpec: chars): void

    /** Sets the value of a named business component user property */
    SetUserProperty(propName: chars, propValue: chars): void

    /** Sets the visibility type for the business component */
    SetViewMode(viewMode: float): void

    /** Reverses any uncommitted changes made to the record*/
    UndoRecord(): void

    /** Commits to the database any changes made to the current record 
     * in a Siebel business component*/
    WriteRecord(): void
}
declare interface iBusObject {

    /** Returns the specified business component */
    GetBusComp(busCompName: chars): BusComp

    /** Returns the name of the business object */
    Name(): chars
}
declare interface iPropertySet {
    /** Adds subsidiary property sets to a property set, so as to form 
     * hierarchical (tree-structured) data structures */
    AddChild(propSet: PropertySet): float

    /** Returns a copy of a property set */
    Copy(): PropertySet

    /**  Gets a specified child property set of a property set */
    GetChild(index: float): PropertySet

    /** Returns the number of child property sets attached to a parent 
     * property set */
    GetChildCount(): float

    /** Returns the name of the first property in a property set */
    GetFirstProperty(): chars

    /** Returns the next property in a property set */
    GetNextProperty(): chars

    /** Returns the value of a property when given the property name */
    GetProperty(propName: chars): chars

    /** Returns the number of properties attached to a property set */
    GetPropertyCount(): float

    /** Retrieves the data value stored in the type attribute of 
     * a property set*/
    GetType(): chars

    /** Retrieves the data value stored in the value attribute of 
     * a property set*/
    GetValue(): chars

    /** Inserts a child property set into a parent property set at 
     * a specific location*/
    InsertChildAt(propSet: PropertySet, index: float): void

    /** Returns a Boolean value indicating whether a specified property 
     * exists in a property set */
    PropertyExists(propName: chars): bool

    /** Removes a child property set from a parent property set */
    RemoveChild(index: float): void

    /** Removes a property from a property set */
    RemoveProperty(propName: chars): void

    /** Removes every properties and child property set from a property set */
    Reset(): void

    /** Assigns a data value to a property in a property set */
    SetProperty(propName: chars, propValue: chars| BusObject | BusComp): void

    /** Assigns a data value to the type attribute of a property set */
    SetType(typeVal: chars): void

    /** Assigns a data value to the value attribute of a property set */
    SetValue(value: chars): void
}
declare interface iService {

    /** Gets the name of the first property of a business service */
    GetFirstProperty(): chars

    /** Gets the name of the next property of a business service */
    GetNextProperty(): chars

    /** Gets the value of the property whose name is specified in the argument */
    GetProperty(propName: chars): chars

    /** Calls the specialized method or user-created method named in the argument. */
    InvokeMethod(methodName: chars, inProp: PropertySet, outProp: PropertySet): void

    /** Calls a method on the business service */
    Name(): void

    /** Returns a Boolean value indicating whether a specified property exists */
    PropertyExists(propName: chars): bool

    /** Removes a property from a business service */
    RemoveProperty(propName: chars): void

    /** Assigns a value to a property of a business service */
    SetProperty(propName: chars, propValue: chars): void
}