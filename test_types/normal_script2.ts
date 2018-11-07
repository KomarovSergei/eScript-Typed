function LookupName(sTypeName: String, sValName: String): String {
	var sResult: chars = "";
	try {
		var boLOV: BusObject = TheApplication().GetBusObject("List Of Values");
		var bcLOV: BusComp = boLOV.GetBusComp("List Of Values");
		var isRecord: bool = false;
		var sSearchExpr: chars = "[Type] = '" + sTypeName + "' and [Value] = '" + sValName + "'";

		with(bcLOV) {
			SetViewMode(AllView);
			ActivateField("Type");
			ClearToQuery();
			SetSearchExpr(sSearchExpr);
			ExecuteQuery(ForwardOnly);
			isRecord = FirstRecord();
			if (isRecord) {
				sResult = GetFieldValue("Name");
			}
		}
	} catch (e) {
		TheApplication().RaiseErrorText(e.errText);
	} finally {
		bcLOV = null;
		boLOV = null;
	}
	return sResult;
}

function UpdateAccount(Inputs: PropertySet, Outputs: PropertySet) {
	var sImpId: chars = Inputs.GetProperty("ImportId");
	if (sImpId == null || sImpId == "") {
		TheApplication().RaiseErrorText("Не указан ImportId");
	}

	try {
		var boImpAcc: BusObject = TheApplication().GetBusObject("SBRF Account Reg Data Import");
		var bcImpAcc: BusComp = boImpAcc.GetBusComp("SBRF Account Reg Data Import");
		var bcAcc: BusComp = boImpAcc.GetBusComp("SBRF UCP Account Lite");
		var Transact: Service = TheApplication().GetService("EAI Transaction Service");
		var inTransProp: PropertySet = TheApplication().NewPropertySet();
		var outTransProp: PropertySet = TheApplication().NewPropertySet();
		var TransCheck;
		var bcImpCnt: BusComp = TheApplication().GetBusObject("SBRF Import Center").GetBusComp("SBRF Import Center");
		var nRecordCount = 0;
		var SuccessRows = 0;
		var ErrorRows = 0;
		var dtDate = new Date();

		var bImpRec;
		var sAccId: chars = "";
		var sName: chars = "";
		var sINN: chars = "";
		var sKPP: chars = "";
		var sOGRN: chars = "";
		var sOGRNDate;
		var sAddr: String = "";
		var sOPF: chars = "";
		var sIndustry: chars = "";
		var sKindActivity: chars = "";
		var sMSP: chars = "";
		var sFullName: chars = "";
		var sOKPO: chars = "";
		var sOKVED: chars = "";
		var sPrimaryOKVED: chars = "";
		var sOKATO: chars = "";
		var sOKK: chars = "";
		var sSubIndustry: chars = "";
		var sMacroIndustry: chars = "";

		bcImpCnt.ClearToQuery();
		bcImpCnt.ActivateField("Start Date");
		bcImpCnt.ActivateField("End Date");
		bcImpCnt.ActivateField("All Rows");
		bcImpCnt.ActivateField("Error Rows");
		bcImpCnt.ActivateField("Success Rows");
		bcImpCnt.SetSearchExpr("[Id]='" + sImpId + "'");
		bcImpCnt.ExecuteQuery(ForwardOnly);
		if (bcImpCnt.FirstRecord()) {
			bcImpCnt.SetFieldValue("Start Date", (dtDate.getMonth() + 1) + "/" + dtDate.getDate() + "/" + dtDate.getFullYear() + " " + dtDate.getHours() + ":" + dtDate.getMinutes() + ":" + dtDate.getSeconds());

			bcImpAcc.ClearToQuery();
			bcImpAcc.ActivateField("Account Id");
			bcImpAcc.ActivateField("Name");
			bcImpAcc.ActivateField("INN");
			bcImpAcc.ActivateField("KPP");
			bcImpAcc.ActivateField("OGRN");
			bcImpAcc.ActivateField("OGRN Date");
			bcImpAcc.ActivateField("Address Name");
			bcImpAcc.ActivateField("Import Id");
			bcImpAcc.ActivateField("Status");
			bcImpAcc.ActivateField("OPF");
			bcImpAcc.ActivateField("Industry");
			bcImpAcc.ActivateField("Kind Activity");
			bcImpAcc.ActivateField("MSP");
			bcImpAcc.ActivateField("Full Name");
			bcImpAcc.ActivateField("OKPO");
			bcImpAcc.ActivateField("OKVED");
			bcImpAcc.ActivateField("Primary OKVED");
			bcImpAcc.ActivateField("OKATO");
			bcImpAcc.ActivateField("OKK");
			bcImpAcc.ActivateField("Sub Industry");
			bcImpAcc.ActivateField("Macro Industry");
			bcImpAcc.ActivateField("Descr");
			bcImpAcc.ActivateField("Error");
			bcImpAcc.SetSearchExpr("[Import Id]='" + sImpId + "' AND [Status]='NEW'");
			bcImpAcc.ExecuteQuery(ForwardOnly);
			bImpRec = bcImpAcc.FirstRecord();

			while (bImpRec) {
				nRecordCount++;
				inTransProp.Reset();
				outTransProp.Reset();
				Transact.InvokeMethod("BeginTransaction", inTransProp, outTransProp);

				sAccId = bcImpAcc.GetFieldValue("Account Id");
				sName = bcImpAcc.GetFieldValue("Name");
				sINN = bcImpAcc.GetFieldValue("INN");
				sKPP = bcImpAcc.GetFieldValue("KPP");
				sOGRN = bcImpAcc.GetFieldValue("OGRN");
				sOGRNDate = bcImpAcc.GetFieldValue("OGRN Date");
				sAddr = bcImpAcc.GetFieldValue("Address Name");
				sOPF = bcImpAcc.GetFieldValue("OPF");
				sIndustry = bcImpAcc.GetFieldValue("Industry");
				sKindActivity = bcImpAcc.GetFieldValue("Kind Activity");
				sMSP = bcImpAcc.GetFieldValue("MSP");
				sFullName = bcImpAcc.GetFieldValue("Full Name");
				sOKPO = bcImpAcc.GetFieldValue("OKPO");
				sOKVED = bcImpAcc.GetFieldValue("OKVED");
				sPrimaryOKVED = bcImpAcc.GetFieldValue("Primary OKVED");
				sOKATO = bcImpAcc.GetFieldValue("OKATO");
				sOKK = bcImpAcc.GetFieldValue("OKK");
				sSubIndustry = bcImpAcc.GetFieldValue("Sub Industry");
				sMacroIndustry = bcImpAcc.GetFieldValue("Macro Industry");

				try {
					bcAcc.ClearToQuery();
					bcAcc.InvokeMethod("SetAdminMode", "TRUE");
					bcAcc.SetViewMode(AllView);
					bcAcc.ActivateField("Id");
					bcAcc.ActivateField("Name");
					bcAcc.ActivateField("SBRF INN");
					bcAcc.ActivateField("SBRF KPP");
					bcAcc.ActivateField("SBRF OGRN");
					bcAcc.ActivateField("Type");
					bcAcc.ActivateField("SBRF Registration Date");
					bcAcc.ActivateField("SBRF MSP Client In Registry");
					bcAcc.ActivateField("SBRF OPF");
					bcAcc.ActivateField("SBRF Full Name");
					bcAcc.ActivateField("SBRF Industry");
					bcAcc.ActivateField("SBRF Kind Activity");
					bcAcc.ActivateField("SBRF Branch Classif Code");
					bcAcc.ActivateField("Industry");
					bcAcc.ActivateField("SBRF OKATO Code");
					bcAcc.ActivateField("SBRF OKPO");
					bcAcc.ActivateField("Primary Industry Id");
					bcAcc.ActivateField("SBRF OKK Codes");
					bcAcc.ActivateField("SBRF Sub Industry");
					bcAcc.ActivateField("SBRF Macro Industry");

					if (sAccId == null || sAccId == "") {
						if (sINN != "" && sINN != null) {

							bcAcc.SetSearchExpr("[SBRF INN] = '" + sINN + "' AND ([Type] = '" + TheApplication().InvokeMethod("LookupValue", "ACCOUNT_TYPE", "Account") + "' OR [Type] = '" + TheApplication().InvokeMethod("LookupValue", "ACCOUNT_TYPE", "Individual") + "')"); //##SHABAROV 23082018 CRP-49602
							bcAcc.ExecuteQuery(ForwardOnly);
							if (bcAcc.FirstRecord()) {

								sAccId = bcAcc.GetFieldValue("Id"); //SHABAROV 24082018 CRP-49228
								UpsertAccount(bcAcc, sName, sKPP, sOGRN, sOGRNDate, sOPF, sIndustry, sKindActivity, sMSP, sFullName, sOKPO, sOKVED, sPrimaryOKVED, sOKATO, sOKK, sSubIndustry, sMacroIndustry);
								if (sAddr != "" && sAddr != null) {
									UpsertAddress(bcImpAcc, sAccId, sAddr);
								}
							} else {
								TheApplication().RaiseErrorText("Организация с таким ИНН не найдена.");
							}
						} else {
							TheApplication().RaiseErrorText("Не указан ни СRMId ни ИНН организации для поиска.");
						}
					} else {
						bcAcc.SetSearchSpec("Id", sAccId);
						bcAcc.ExecuteQuery(ForwardOnly);

						if (bcAcc.FirstRecord()) {
							UpsertAccount(bcAcc, sName, sKPP, sOGRN, sOGRNDate, sOPF, sIndustry, sKindActivity, sMSP, sFullName, sOKPO, sOKVED, sPrimaryOKVED, sOKATO, sOKK, sSubIndustry, sMacroIndustry);
							if (sINN != "" && sINN != null) {
								bcAcc.SetFieldValue("SBRF INN", sINN);
							}
							if (sAddr != "" && sAddr != null) {
								UpsertAddress(bcImpAcc, sAccId, sAddr);
							}
						} else {
							TheApplication().RaiseErrorText("Организация с таким Id не найдена.");
						}
					}
					bcAcc.WriteRecord();
					ValidateAccountData(bcImpAcc, sAccId);
					bcAcc.InvokeMethod("SetAdminMode", "FALSE");
					inTransProp.SetProperty("Is Abort", "False");
					Transact.InvokeMethod("EndTransaction", inTransProp, outTransProp);
					bcImpAcc.SetFieldValue("Status", TheApplication().InvokeMethod("LookupValue", "SBRF_IMP_CENTER_LOAD_STATUS", "Done"));
					bcImpAcc.WriteRecord();
					SuccessRows++;
				} catch (e) {
					bcAcc.UndoRecord();
					Transact.InvokeMethod("IsInTransaction", inTransProp, outTransProp);
					TransCheck = outTransProp.GetProperty("IsInTransaction");
					if (TransCheck == "true") {
						inTransProp.Reset();
						inTransProp.SetProperty("Is Abort", "True");
						Transact.InvokeMethod("EndTransaction", inTransProp, outTransProp);
					}
					bcImpAcc.SetFieldValue("Status", "Ошибка");
					bcImpAcc.SetFieldValue("Descr", e.message.substr(0, 254));
					bcImpAcc.SetFieldValue("Error", e.errCode);
					bcImpAcc.WriteRecord();
					ErrorRows++;
				}
				bImpRec = bcImpAcc.NextRecord();
			}
			dtDate = new Date();
			bcImpCnt.SetFieldValue("End Date", (dtDate.getMonth() + 1) + "/" + dtDate.getDate() + "/" + dtDate.getFullYear() + " " + dtDate.getHours() + ":" + dtDate.getMinutes() + ":" + dtDate.getSeconds());
			bcImpCnt.SetFieldValue("All Rows", nRecordCount);
			bcImpCnt.SetFieldValue("Error Rows", ErrorRows);
			bcImpCnt.SetFieldValue("Success Rows", SuccessRows);
			bcImpCnt.WriteRecord();
		}
	} catch (e) {
		Outputs.SetProperty("Error Code", "-1");
		Outputs.SetProperty("Error Message", e.message);
	} finally {
		dtDate = null;
		nRecordCount = null;
		bcImpCnt = null;
		bImpRec = null;
		sAccId = null;
		bcAcc = null;
		sName = null;
		sINN = null;
		sKPP = null;
		sOGRN = null;
		sOGRNDate = null;
		sAddr = null;
		sOPF = null;
		sIndustry = null;
		sKindActivity = null;
		sMSP = null;
		sFullName = null;
		sOKPO = null;
		sOKVED = null;
		sPrimaryOKVED = null;
		sOKATO = null;
		sOKK = null;
		sSubIndustry = null;
		sMacroIndustry = null;
		bcImpAcc = null;
		boImpAcc = null;
		sImpId = null;
	}
}

function UpsertAccount(bcAcc: BusComp, sName: chars, sKPP: chars, sOGRN: chars, sOGRNDate: chars, sOPF: chars, sIndustry: chars, sKindActivity: chars, sMSP: chars, sFullName: chars, sOKPO: chars, sOKVED: chars, sPrimaryOKVED: chars, sOKATO: chars, sOKK: chars, sSubIndustry: chars, sMacroIndustry: chars) {
	try {
		var boImp: BusObject = bcAcc.BusObject();
		var bcMVGIndustry: BusComp = bcAcc.GetMVGBusComp("Industry");
		var assocBC = bcMVGIndustry.GetAssocBusComp();
		var bcKindActivity: BusComp = boImp.GetBusComp("SBRF Sector Classific Codes");
		var bcClassifyTypes: BusComp = boImp.GetBusComp("SBRF Classify Types");
		var bcOKK: BusComp = bcAcc.GetPicklistBusComp("SBRF OKK Codes");
		var bcMacro: BusComp = bcAcc.GetPicklistBusComp("SBRF Macro Industry");

		if (sName != "" && sName != null) {
			bcAcc.SetFieldValue("Name", sName);
		}
		if (sKPP != "" && sKPP != null) {
			bcAcc.SetFieldValue("SBRF KPP", sKPP);
		}
		if (sOGRN != "" && sOGRN != null) {
			bcAcc.SetFieldValue("SBRF OGRN", sOGRN);
		}
		if (sOGRNDate != "" && sOGRNDate != null) {
			bcAcc.SetFieldValue("SBRF Registration Date", sOGRNDate);
		}
		if (sOPF != "" && sOPF != null) {
			if (LookupName("SBRF_OPF", sOPF) == "") {
				TheApplication().RaiseErrorText("Некорректный ОПФ");
			} else {
				//bcAcc.SetFieldValue("SBRF OPF", LookupName("SBRF_OPF", sOPF));
				bcAcc.SetFieldValue("SBRF OPF", sOPF);
			}
		}
		if (sIndustry != "" && sIndustry != null) {
			if (sKindActivity != "" && sKindActivity != null) {
				if (LookupName("SBRF_INDUSTRY", sIndustry) == "") {
					TheApplication().RaiseErrorText("Некорректное значение отрасли");
				} else {
					bcKindActivity.ClearToQuery();
					bcKindActivity.InvokeMethod("SetAdminMode", "TRUE");
					bcKindActivity.SetViewMode(AllView);
					bcKindActivity.ActivateField("SBRF Branch");
					bcKindActivity.ActivateField("SBRF Kind of Activity");
					bcKindActivity.SetSearchExpr("[SBRF Branch]='" + sIndustry + "' AND [SBRF Kind of Activity]='" + sKindActivity + "'");
					bcKindActivity.ExecuteQuery(ForwardOnly);
					if (bcKindActivity.FirstRecord()) {
						bcAcc.SetFieldValue("SBRF Industry", sIndustry);
						//bcAcc.WriteRecord();
						bcAcc.SetFieldValue("SBRF Kind Activity", sKindActivity);
					} else {
						TheApplication().RaiseErrorText("Некорректное значение отрасли");
					}
				}
			}
		}
		if (sMSP != "" && sMSP != null) {
			bcAcc.SetFieldValue("SBRF MSP Client In Registry", sMSP);
		}
		if (sFullName != "" && sFullName != null) {
			bcAcc.SetFieldValue("SBRF Full Name", sFullName);
		}
		if (sOKPO != "" && sOKPO != null) {
			bcAcc.SetFieldValue("SBRF OKPO", sOKPO);
		}
		if (sOKVED != "" && sOKVED != null) {
			bcMVGIndustry.ActivateField("SIC Code");
			bcMVGIndustry.SetSearchExpr("[SIC Code]='" + sOKVED + "'");
			bcMVGIndustry.ExecuteQuery(ForwardOnly);
			if (!bcMVGIndustry.FirstRecord()) {
				assocBC.ActivateField("SIC Code");
				assocBC.SetSearchExpr("[SIC Code]='" + sOKVED + "'");
				assocBC.ExecuteQuery(ForwardOnly);
				if (assocBC.FirstRecord()) {
					assocBC.Associate(NewAfter);
					if (sPrimaryOKVED == "Y") {
						bcAcc.SetFieldValue("Primary Industry Id", assocBC.GetFieldValue("Id"));
					}

				} else {
					TheApplication().RaiseErrorText("Некорректный ОКВЭД");
				}
			}
		}
		if (sOKATO != "" && sOKATO != null) {
			bcClassifyTypes.ClearToQuery();
			bcClassifyTypes.InvokeMethod("SetAdminMode", "TRUE");
			bcClassifyTypes.SetViewMode(AllView);
			bcClassifyTypes.ActivateField("SBRF Classify Type LIC");
			bcClassifyTypes.ActivateField("SBRF Value Code");
			bcClassifyTypes.SetSearchExpr("[SBRF Value Code]='" + sOKATO + "' AND [SBRF Classify Type LIC]='OKATO'");
			bcClassifyTypes.ExecuteQuery(ForwardOnly);
			if (bcClassifyTypes.FirstRecord()) {
				bcAcc.SetFieldValue("SBRF OKATO Code", sOKATO);
			} else {
				TheApplication().RaiseErrorText("Некорректный ОКАТО");
			}
		}

		if (sOKK != "" && sOKK != null) {
			bcOKK.ClearToQuery();
			bcOKK.InvokeMethod("SetAdminMode", "TRUE");
			bcOKK.SetViewMode(AllView);
			bcOKK.ActivateField("Code Ext");
			bcOKK.SetSearchExpr("[Code Ext]='" + sOKK + "'");
			bcOKK.ExecuteQuery(ForwardOnly);
			if (bcOKK.FirstRecord()) {
				bcOKK.Pick();
			} else {
				TheApplication().RaiseErrorText("Некорректный ОКК");
			}
		} else {
			if (sSubIndustry != "" && sSubIndustry != null) {
				if (sMacroIndustry != "" && sMacroIndustry != null) {
					bcOKK.ClearToQuery();
					bcOKK.InvokeMethod("SetAdminMode", "TRUE");
					bcOKK.SetViewMode(AllView);
					bcOKK.ActivateField("Value");
					bcOKK.SetSearchExpr("[Value]='" + sSubIndustry + "' AND [Parent Value]='" + sMacroIndustry + "'");
					bcOKK.ExecuteQuery(ForwardOnly);
					if (bcOKK.FirstRecord()) {
						bcOKK.Pick();
					} else {
						TheApplication().RaiseErrorText("Значение Подоотрасли не соответствует Макроотрасли клиента");
					}
				} else {
					TheApplication().RaiseErrorText("Значение Подоотрасли не соответствует Макроотрасли клиента");
				}
			} else {
				if (sMacroIndustry != "" && sMacroIndustry != null) {
					bcMacro.ClearToQuery();
					bcMacro.InvokeMethod("SetAdminMode", "TRUE");
					bcMacro.SetViewMode(AllView);
					bcMacro.ActivateField("Value");
					bcMacro.SetSearchExpr("[Value]='" + sMacroIndustry + "'");
					bcMacro.ExecuteQuery(ForwardOnly);
					if (bcMacro.FirstRecord()) {
						bcMacro.Pick();
					} else {
						TheApplication().RaiseErrorText("Некорректная Макроотрасль");
					}
				}
			}
		}
	} catch (e) {
		TheApplication().RaiseErrorText(e.message);
	} finally {
		bcKindActivity = null;
		bcMVGIndustry = null;
		assocBC = null;
		bcClassifyTypes = null;
		boImp = null;
	}
}

function UpsertAddress(bcImpAcc: BusComp, sAccId: String, sAddr: String) {

	try {
		var boImp: BusObject = bcImpAcc.BusObject();
		var bcAccount: BusComp = boImp.GetBusComp("SBRF UCP Account Lite");

		bcAccount.ClearToQuery();
		bcAccount.InvokeMethod("SetAdminMode", "TRUE");
		bcAccount.SetViewMode(AllView);
		bcAccount.ActivateField("Primary Address Id");
		bcAccount.SetSearchExpr("[Id] = '" + sAccId + "'");
		bcAccount.ExecuteQuery(ForwardOnly);
		if (bcAccount.FirstRecord()) {
			//смотрим существует ли под организацией адрес с типом Юридический
			var bcMVGAddr: BusComp = bcAccount.GetMVGBusComp("Street Address");
			bcMVGAddr.ClearToQuery();
			bcMVGAddr.InvokeMethod("SetAdminMode", "TRUE");
			bcMVGAddr.SetViewMode(AllView);
			bcMVGAddr.ActivateField("Account Id");
			bcMVGAddr.ActivateField("Street Address");
			bcMVGAddr.ActivateField("Type");
			bcMVGAddr.SetSearchExpr("[Account Id]='" + sAccId + "' AND [Type]='Юридический'");
			bcMVGAddr.ExecuteQuery(ForwardOnly);
			//если да - апдейтим
			if (bcMVGAddr.FirstRecord()) {
				bcMVGAddr.SetFieldValue("Street Address", sAddr);
				bcMVGAddr.WriteRecord();
			}
			//если нет - создаем
			else {
				bcMVGAddr.NewRecord("NewAfter");
				bcMVGAddr.SetFieldValue("Street Address", sAddr);
				bcMVGAddr.SetFieldValue("Type", TheApplication().InvokeMethod("LookupValue", "ADDR_TYPE", "Legal Address"));
				bcMVGAddr.WriteRecord();
			}
			bcMVGAddr.InvokeMethod("SetAdminMode", "FALSE");
			bcAccount.SetFieldValue("Primary Address Id", bcMVGAddr.GetFieldValue("Id"));
			bcAccount.InvokeMethod("SetAdminMode", "FALSE");
		}
	} catch (e) {
		TheApplication().RaiseErrorText(e.message);
	} finally {
		bcAccount = null;
		bcMVGAddr = null;
		boImp = null;
		sAccId = null;
		sAddr = null;
		bcImpAcc = null;
	}
}

function ValidateAccountData(bcImpAcc: BusComp, sAccId: String) {
	try {
		var boImp: BusObject = bcImpAcc.BusObject();
		var bcAccount: BusComp = boImp.GetBusComp("SBRF UCP Account Lite");

		var oDvmBS = TheApplication().GetService("Data Validation Manager");
		var oInDvmPS = TheApplication().NewPropertySet();
		var oOutDvmPS = TheApplication().NewPropertySet();

		var sError: String = "";

		bcAccount.ClearToQuery();
		bcAccount.SetViewMode(AllView);
		bcAccount.SetSearchExpr("[Id] = '" + sAccId + "'");
		bcAccount.ExecuteQuery(ForwardOnly);
		if (bcAccount.FirstRecord()) {
			oInDvmPS.SetProperty("Active Object", "N");
			oInDvmPS.SetProperty("BusObj", boImp);
			oInDvmPS.SetProperty("BusComp", bcAccount);
			oInDvmPS.SetProperty("Object Id", bcAccount.GetFieldValue("Id"));
			oInDvmPS.SetProperty("Enable Log", "N");
			oInDvmPS.SetProperty("Rule Set Name", "SBRF Account Validation CI");
			oDvmBS.InvokeMethod("Validate", oInDvmPS, oOutDvmPS);
			sError = oOutDvmPS.GetProperty("Return Message");

			if (sError > "") {
				throw sError;
			}
		}
	} catch (e) {
		TheApplication().RaiseErrorText(e.message);
	} finally {
		bcAccount = null;
		sError = null;
		oOutDvmPS = null;
		oInDvmPS = null;
		oDvmBS = null;
		sAccId = null;
		boImp = null;
	}
}

function Service_PreInvokeMethod(MethodName, Inputs, Outputs) {
	if (MethodName == "UpdateAccount") {
		UpdateAccount(Inputs, Outputs);
		return (CancelOperation);
	}
	return (ContinueOperation);
}