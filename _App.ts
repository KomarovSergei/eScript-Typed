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
    InvokeMethod(methodName: chars, param1: chars, param2: chars | null,
        param10: chars | null): chars

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