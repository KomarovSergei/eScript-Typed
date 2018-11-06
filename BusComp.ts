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
    InvokeMethod(methodName: chars, param1: chars, param2: chars,
        param3: chars, param4: chars, param10: chars): chars

    /** Moves to the last record in the business component */
    LastRecord(): bool

    /** Property contains the name of the business component */
    Name(): chars

    /** NewRecord adds a new record (row) to a Siebel business component */
    NewRecord(cursorMode: float): void

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