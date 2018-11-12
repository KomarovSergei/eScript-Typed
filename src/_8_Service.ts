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