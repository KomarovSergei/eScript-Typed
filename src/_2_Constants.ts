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