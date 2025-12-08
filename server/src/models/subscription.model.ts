import mongoose from "mongoose";
import UserModel from "./user.model";
import type { CallbackWithoutResultAndOptionalError } from "mongoose";


const SubscriptionSchema =new mongoose.Schema({

    name:{type:String,
        required:[true,'user name is required'],
        trim:true,
        minLength:2,
        maxLength:50,
    },

    price:{
        type:Number,
        min:[0,'price must be grater then 0'],
        required:[true,'Subscription price is required'],


    },
    currency:{
        type:String,
        enum:['USD','EUR','GBP'],
        default:'USD',

        
    },
    frequency:{
        type:String,
        enum:['daily','weekly','monthly','yearly'],


    },
    category:{
        type:String,

    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true,
    },

    status:{
        type:String,
        enum:['active','cancelled','expired'],
        default:'active'
    },

    startDate:{
        type:Date,
        required:true,
        validate:{
            validator:(value:Date)=>value<=new Date(),
            message:'start date must be in the past', 
            

        }
    },

    renewalDate:{
        type:Date,
        required:true,
        validate:{
            validator:function (this:any,value:Date):boolean{
                return value>=new this.startDate.getTime() 
            },
            message:'start date must be in the past',
            

        }
    },

    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserModel',
        required:true,
        index:true
    }




},{timestamps:true});

type Frequency = "daily" | "weekly" | "monthly" | "yearly";


const renewalDays: Record<Frequency, number> = {
  daily: 1,
  weekly: 7,
  monthly: 30,
  yearly: 365,
};




//this function will run before the scheam -- it will calculate the renewal date if the dat is missing
SubscriptionSchema.pre("save", function (next) {
  // `this` is the document
  if (!this.renewalDate) {
    if (!this.frequency || !this.startDate) {
      return false;
    }

    const freq = this.frequency as Frequency;
    const daysToAdd = renewalDays[freq];

    const date = new Date(this.startDate);
    date.setDate(date.getDate() + daysToAdd);
    this.renewalDate = date;
  }

 
});
const SubscriptionModel=mongoose.model('SubscriptionModel',SubscriptionSchema);

export default SubscriptionModel;

