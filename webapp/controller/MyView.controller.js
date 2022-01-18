sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast) {
        "use strict";

        return Controller.extend("EmployeeProject.employeeproject.controller.MyView", {
            onInit: function () {
                var oEmployeeData ={
                    "Employee" : {
                        "Employee_Id" : "",
                        "FName" : "",
                        "LName" : "",
                        "Telephone" : "",
                        "Email" : "",
                        "Gender" : "",
                        "DOB" : "",
                        "Pincode" : "",
                        "Hometown" : "",
                        "Landmark" : ""
                    },
                    "DialogEmployeeDetails":{

                    },
                    "EmployeeValueState":
                    {
                        "Fname_VS":"Error",
                        "Fname_VST":"please enter the value",
                        "Lname_VS":"None",
                        "Lname_VST":"" 
                    } ,
                    "EmployeeList" :[
                        {
                        "Employee_Id" : "805377",
                        "FName" : "Niveditha",
                        "LName" : "Gattu",
                        "Telephone" : "8328062422",
                        "Email" : "gattusainiveditha@gmail.com",
                        "Gender" : "Female",
                        "DOB" : "26-06-1999",
                        "Pincode" : "515671",
                        "Hometown" : "Dmm",
                        "Landmark" : "SR circle"
                        }
                    ]
                };
            var oModel = new.sap.ui.model.json.JSONModel(oEmployeeData);
            this.getView().setModel(oModel,"EmployeeModel");       
            },

            // Function named onPressSave
            onPressSave: function(){
                var oEmpModel = this.getView().getModel("EmployeeModel");
                var oEmployeeData = oEmpModel.getProperty("/Employee");
                var EmpList = oEmpModel.getProperty("/EmployeeList")
                Employee_List.push(oEmployeeData);
                oEmpModel.setProperty("/EmployeeList",EmpList);
                MessageToast.show("Record inserted successfully")
            },

            // Function named onPressClear
            onPressClear: function(){

            },


            // Function named onChangeFName
            onChangeFName: function(oEvent){
                var fValue = oEvent.getSource().getValue();
                if(fValue.length>=20){
                    oEvent.getSource().setValueState("Error");
                    oEvent.getSource().setValueStateText("Length should be 20");
                }
                else{
                    oEvent.getSource().setValueState("None");
                    oEvent.getSource().setValueStateText(" ");
                }
            },


            // Function named onChangeFLName
            onChangeLName: function(oEvent){
                var lValue = oEvent.getSource().getValue();
                if(lValue.length>=10){
                    oEvent.getSource().setValueState("Error");
                    oEvent.getSource().setValueStateText("Length should be 10");
                }
                else{
                    oEvent.getSource().setValueState("None");
                    oEvent.getSource().setValueStateText(" ");
                }
            },

            // Function named onChangeMobNum

            onChangeTelephone: function(oEvent){
                var mobValue = oEvent.getSource().getValue();
                if(mobValue.length!=10){
                    oEvent.getSource().setValueState("Error");
                    oEvent.getSource().setValueStateText("Invalid Mobile Number");
                }
                else{
                    oEvent.getSource().setValueState("None");
                    oEvent.getSource().setValueStateText(" ");
                }
            },


            // Function named onSelectGender

            onSelectGender: function(oEvent){
                var oEmpModel = this.getView().getModel("EmployeeModel");
                var selectedData = oEvent.getSource().getSelectedButton().getText();
                oEmpModel.setProperty("/Employee/Gender",selectedData);
            },

            // Formatters

            MyFormatter: function(FName,LName,Gender){
                var value;
                if(Gender == "Male"){
                    value = "Mr." + FName + " " + LName;
                }else if(Gender == "Female"){
                    value = "Mrs." + FName + " " + LName;
                }
                return value;
            },
            onPressShow: function(oEvent){
                var that = this;
                let selectedPath = oEvent.getSource().getBindingContext("EmployeeModel").getPath();
                let oModel = this.getView().getModel("EmployeeModel");
                let oSelectedData = oModel.getProperty(selectedPath);
                oModel.setProperty("/DialogEmployeeDetails",oSelectedData);
                if(!that._oDialogEmployeeDetails){
                    that._oDialogEmployeeDetails = sap.ui.xmlfragment(
                        this.getView().getId(),
                        "EmployeeProject.employeeproject",
                        this
                    );
                }
                that.getView().addDependent(that._oDialogEmployeeDetails);
                that._oDialogEmployeeDetails.open();
            },
            onClose: function(){
                var that = this;
                if(that._oDialogEmployeeDetails)
                {
                    that.getView().removeDependent(that._oDialogEmployeeDetails);
                    that._oDialogEmployeeDetails.close();
                }
            }


        });
    });
