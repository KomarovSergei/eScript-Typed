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
    SetProperty(propName: chars, propValue: chars): void

    /** Assigns a data value to the type attribute of a property set */
    SetType(typeVal: chars): void

    /** Assigns a data value to the value attribute of a property set */
    SetValue(value: chars): void
}