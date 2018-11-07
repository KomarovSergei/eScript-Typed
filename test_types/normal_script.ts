function addDULToMaster(oContactBC: BusComp, oDULAssoc: BusComp, Input: PropertySet) {
    try {
        var bDULRec: Boolean,
            cDULlNum: chars,
            cMasterConId: chars = Input.GetProperty("cMasterConId");

        oContactBC.SetViewMode(AllView);
        oContactBC.ClearToQuery();
        oContactBC.SetSearchSpec("Id", cMasterConId);
        oContactBC.ExecuteQuery(ForwardOnly);
        if (oContactBC.FirstRecord()) {

            for (var i = 0; i < Input.GetChildCount(); i++) {
                cDULlNum = Input.GetChild(i).GetProperty("Address");
                oDULAssoc.ClearToQuery();
                oDULAssoc.SetSearchExpr("[Object Id] = '" + cMasterConId + "' AND [Type Doc] = '" + cDULlNum + "' AND [Series] = '" + Input.GetChild(i).GetProperty("Series") + "' AND [Number] ='" + Input.GetChild(i).GetProperty("Number") + "'");
                oDULAssoc.ExecuteQuery(ForwardOnly);
                bDULRec = oDULAssoc.FirstRecord();

                if (bDULRec == "false") {
                    oDULAssoc.NewRecord(NewAfter);
                    oDULAssoc.SetFieldValue("Object Id", cMasterConId);
                    oDULAssoc.SetFieldValue("Issue Date", Input.GetChild(i).GetProperty("Issue Date"));
                    oDULAssoc.SetFieldValue("Number", Input.GetChild(i).GetProperty("Number"));
                    oDULAssoc.SetFieldValue("Registrator", Input.GetChild(i).GetProperty("Registrator"));
                    oDULAssoc.SetFieldValue("Series", Input.GetChild(i).GetProperty("Series"));
                    oDULAssoc.SetFieldValue("Status", Input.GetChild(i).GetProperty("Status"));
                    oDULAssoc.SetFieldValue("Type", Input.GetChild(i).GetProperty("Type"));
                    oDULAssoc.SetFieldValue("Type Doc", Input.GetChild(i).GetProperty("Type Doc"));
                    oDULAssoc.WriteRecord();
                }
            }
        }
    } catch (e) {
        throw e;
    } finally {
        bDULRec = null;
        cDULlNum = null;
        cMasterConId = null;
    }
}

function addEmailToMaster(oContactBC: BusComp, oEmailAssoc: BusComp, Input: PropertySet) {
    try {
        var bEmailRec: Boolean,
            cEmailNum: chars,
            cMasterConId: chars = Input.GetProperty("cMasterConId");

        oContactBC.SetViewMode(AllView);
        oContactBC.ClearToQuery();
        oContactBC.SetSearchSpec("Id", cMasterConId);
        oContactBC.ExecuteQuery(ForwardOnly);
        if (oContactBC.FirstRecord()) {

            for (var i = 0; i < Input.GetChildCount(); i++) {
                cEmailNum = Input.GetChild(i).GetProperty("Address");
                oEmailAssoc.SetViewMode(AllView);
                oEmailAssoc.ClearToQuery();
                oEmailAssoc.SetSearchExpr("[Person Id] = '" + cMasterConId + "' AND [Address] ~ LIKE '" + cEmailNum + "'");
                oEmailAssoc.ExecuteQuery(ForwardOnly);
                bEmailRec = oEmailAssoc.FirstRecord();

                if (bEmailRec == "false") {
                    oEmailAssoc.NewRecord(NewAfter);
                    oEmailAssoc.SetFieldValue("Person Id", cMasterConId);
                    oEmailAssoc.SetFieldValue("Address", Input.GetChild(i).GetProperty("Address"));
                    oEmailAssoc.SetFieldValue("Medium Type", Input.GetChild(i).GetProperty("Medium Type"));
                    oEmailAssoc.SetFieldValue("Use Type", Input.GetChild(i).GetProperty("Use Type"));
                    oEmailAssoc.WriteRecord();
                }
            }
        }
    } catch (e) {
        throw e;
    } finally {
        bEmailRec = null;
        cEmailNum = null;
        cMasterConId = null;
    }
}

function addTelToMaster(oContactBC: BusComp, oPhoneAssoc: BusComp, Input: PropertySet) {
    try {
        var bPhoneRec: Boolean,
            cPhoneNum: chars,
            cMasterConId: chars = Input.GetProperty("cMasterConId");

        oContactBC.SetViewMode(AllView);
        oContactBC.ClearToQuery();
        oContactBC.SetSearchSpec("Id", cMasterConId);
        oContactBC.ExecuteQuery(ForwardOnly);
        if (oContactBC.FirstRecord()) {

            for (var i = 0; i < Input.GetChildCount(); i++) {
                cPhoneNum = Input.GetChild(i).GetProperty("Address");
                oPhoneAssoc.ClearToQuery();
                oPhoneAssoc.SetSearchExpr("[Person Id] = '" + cMasterConId + "' AND [Address] = '" + cPhoneNum + "'");
                oPhoneAssoc.ExecuteQuery(ForwardOnly);
                bPhoneRec = oPhoneAssoc.FirstRecord();

                if (bPhoneRec == "false") {
                    oPhoneAssoc.NewRecord(NewAfter);
                    oPhoneAssoc.SetFieldValue("Person Id", cMasterConId);
                    oPhoneAssoc.SetFieldValue("Address", Input.GetChild(i).GetProperty("Address"));
                    oPhoneAssoc.SetFieldValue("Medium Type", Input.GetChild(i).GetProperty("Medium Type"));
                    oPhoneAssoc.SetFieldValue("Use Type", Input.GetChild(i).GetProperty("Use Type"));
                    oPhoneAssoc.WriteRecord();
                }
            }
        }
    } catch (e) {
        throw e;
    } finally {
        bPhoneRec = null;
        cPhoneNum = null;
        cMasterConId = null;
    }
}

function getIdsOfContactsChildRecords(Inputs, Outputs) {
    try {
        TheApplication().SetProfileAttr("SBRF MDM Processing", "TRUE");

        var oContactBO: BusObject = TheApplication().GetBusObject("Contact"),
            oContactBC: BusComp = oContactBO.GetBusComp("Contact"),
            oDULAssoc: BusComp = oContactBO.GetBusComp("SBRF Contact Reg Doc"),
            oPhoneAssoc: BusComp = oContactBO.GetBusComp("Alternate Phone"),
            oEmailAssoc: BusComp = oContactBO.GetBusComp("Communication Address"),
            cConId: chars = Inputs.GetProperty("cConId"),
            cMasterConId: chars = Inputs.GetProperty("cMasterConId"),

            /*cConId = "1-JPRU54R",
            cMasterConId = "1-JPRU54E",*/

            bEmailRec: Boolean,
            bPhoneRec: Boolean,
            bDULRec: Boolean,
            psPurgeContactsIn: PropertySet = TheApplication().NewPropertySet(),
            psEmailIn: PropertySet = TheApplication().NewPropertySet(),
            psDULIn: PropertySet = TheApplication().NewPropertySet(),
            psPurgeContactsChild: PropertySet = TheApplication().NewPropertySet(),
            psEmailChild: PropertySet = TheApplication().NewPropertySet(),
            psDULChild: PropertySet = TheApplication().NewPropertySet();

        oContactBC.SetViewMode(AllView);
        oContactBC.ClearToQuery();
        oContactBC.SetSearchSpec("Id", cConId);
        oContactBC.ExecuteQuery(ForwardOnly);
        if (oContactBC.FirstRecord()) {

            // получаем все телефоны
            oPhoneAssoc.SetViewMode(AllView);
            oPhoneAssoc.ActivateField("Person Id");
            oPhoneAssoc.ActivateField("Address");
            oPhoneAssoc.ActivateField("Medium Type");
            oPhoneAssoc.ActivateField("Use Type");
            oPhoneAssoc.ClearToQuery();
            oPhoneAssoc.SetSearchSpec("Person Id", cConId);
            oPhoneAssoc.ExecuteQuery(ForwardOnly);
            bPhoneRec = oPhoneAssoc.FirstRecord();

            while (bPhoneRec && bPhoneRec != "false") {
                psPurgeContactsChild.SetProperty("Address", oPhoneAssoc.GetFieldValue("Address"));
                psPurgeContactsChild.SetProperty("Medium Type", oPhoneAssoc.GetFieldValue("Medium Type"));
                psPurgeContactsChild.SetProperty("Use Type", oPhoneAssoc.GetFieldValue("Use Type"));
                psPurgeContactsIn.AddChild(psPurgeContactsChild.Copy());
                bPhoneRec = oPhoneAssoc.NextRecord();
            }

            // получаем все email
            oEmailAssoc.SetViewMode(AllView);
            oEmailAssoc.ActivateField("Person Id");
            oEmailAssoc.ActivateField("Address");
            oEmailAssoc.ActivateField("Medium Type");
            oEmailAssoc.ActivateField("Use Type");
            oEmailAssoc.ClearToQuery();
            oEmailAssoc.SetSearchSpec("Person Id", cConId);
            oEmailAssoc.ExecuteQuery(ForwardOnly);
            bEmailRec = oEmailAssoc.FirstRecord();

            while (bEmailRec && bEmailRec != "false") {
                psEmailChild.SetProperty("Address", oEmailAssoc.GetFieldValue("Address"));
                psEmailChild.SetProperty("Medium Type", oEmailAssoc.GetFieldValue("Medium Type"));
                psEmailChild.SetProperty("Use Type", oEmailAssoc.GetFieldValue("Use Type"));
                psEmailIn.AddChild(psEmailChild.Copy());
                bEmailRec = oEmailAssoc.NextRecord();
            }

            // получаем все ДУЛ
            oDULAssoc.SetViewMode(AllView);
            oDULAssoc.ActivateField("Object Id");
            oDULAssoc.ActivateField("Issue Date");
            oDULAssoc.ActivateField("Number");
            oDULAssoc.ActivateField("Registrator");
            oDULAssoc.ActivateField("Series");
            oDULAssoc.ActivateField("Status");
            oDULAssoc.ActivateField("Type");
            oDULAssoc.ActivateField("Type Doc");
            oDULAssoc.ClearToQuery();
            oDULAssoc.SetSearchSpec("Object Id", cConId);
            oDULAssoc.ExecuteQuery(ForwardOnly);
            bDULRec = oDULAssoc.FirstRecord();

            while (bDULRec && bDULRec != "false") {
                psDULChild.SetProperty("Issue Date", oDULAssoc.GetFieldValue("Issue Date"));
                psDULChild.SetProperty("Number", oDULAssoc.GetFieldValue("Number"));
                psDULChild.SetProperty("Registrator", oDULAssoc.GetFieldValue("Registrator"));
                psDULChild.SetProperty("Series", oDULAssoc.GetFieldValue("Series"));
                psDULChild.SetProperty("Status", oDULAssoc.GetFieldValue("Status"));
                psDULChild.SetProperty("Type", oDULAssoc.GetFieldValue("Type"));
                psDULChild.SetProperty("Type Doc", oDULAssoc.GetFieldValue("Type Doc"));
                psDULIn.AddChild(psDULChild.Copy());
                bDULRec = oDULAssoc.NextRecord();
            }
        }

        //Перезакрепляем связи дубля к контакту мастеру
        if (psPurgeContactsIn.GetChildCount() > 0) {
            psPurgeContactsIn.SetProperty("cMasterConId", cMasterConId);
            addTelToMaster(oContactBC, oPhoneAssoc, psPurgeContactsIn);
        }

        if (psEmailIn.GetChildCount() > 0) {
            psEmailIn.SetProperty("cMasterConId", cMasterConId);
            addEmailToMaster(oContactBC, oEmailAssoc, psEmailIn);
        }

        if (psDULIn.GetChildCount() > 0) {
            psDULIn.SetProperty("cMasterConId", cMasterConId);
            addDULToMaster(oContactBC, oDULAssoc, psDULIn);
        }

        // проставляем статус "архив" и причину перевода "дубль"
        oContactBC.SetViewMode(AllView);
        oContactBC.ActivateField("SBRF Archive Reason");
        oContactBC.ActivateField("SBRF Contact State");
        oContactBC.ClearToQuery();
        oContactBC.SetSearchSpec("Id", cConId);
        oContactBC.ExecuteQuery(ForwardOnly);
        if (oContactBC.FirstRecord()) {
            oContactBC.SetFieldValue("SBRF Archive Reason", TheApplication().InvokeMethod("LookupValue", "SBRF_ARCHIVE_REASON", "Take"));
            oContactBC.SetFieldValue("SBRF Contact State", TheApplication().InvokeMethod("LookupValue", "SBRF_CONTACT_STATE", "Archive"));
            oContactBC.WriteRecord();
        }

    } catch (e) {
        Outputs.SetProperty("error", e);
    } finally {
        TheApplication().SetProfileAttr("SBRF MDM Processing", "FALSE");
        oContactBC = null;
        oDULAssoc = null;
        oPhoneAssoc = null;
        oEmailAssoc = null;
        cConId = null;
        cMasterConId = null;
        bEmailRec = null;
        bPhoneRec = null;
        bDULRec = null;
        oContactBO = null;
        psPurgeContactsIn = null;
        psPurgeContactsChild = null;
        psEmailIn = null;
        psEmailChild = null;
        psDULIn = null;
        psDULChild = null;
    }
}

function Service_PreInvokeMethod(MethodName, Inputs, Outputs) {
    if (MethodName == "getIdsOfContactsChildRecords") {
        getIdsOfContactsChildRecords(Inputs, Outputs);
        return (CancelOperation);
    }

    return (ContinueOperation);
}