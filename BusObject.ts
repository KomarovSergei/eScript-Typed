declare interface iBusObject {

    /** Returns the specified business component */
    GetBusComp(busCompName: chars): BusComp

    /** Returns the name of the business object */
    Name(): chars
}