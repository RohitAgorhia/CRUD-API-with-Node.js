const User = require('../models/users.js');
const responses = require('../middleware/reponses');

const jwt = require('jsonwebtoken');
const config = require('../config');
const multer = require('multer');
const nodemail=require('../../config/mail.config');
const express = require('express');
var bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;



//-------------------------------  SIGNUP ---

exports.signup = async (req, res) => {

  const {name,lastname, email, password,country } = req.body

  if(name && email && password && country)
  {
    
    try {
      
        User.findOne({email: email}).then(async check =>{        
        const otp=getOtp();

        if(!check || check.length == 0)
        {
            //new Insert user
              const userData = getUserData(req,otp);
              userData.save().then(async data => {

                //email
                  // nodemail.main(email,otp);
                  return responses.sendResponse(res, 'success', "Email has been sent, Please verify your account.");
              
              }).catch(err => {
                  return responses.sendSqlQueryFailResponse(res, err);
              });
        }
        else
        {
          if(check.verify == 'false')
          {
            //Update user
            const update_user = updateUserData(req,check,otp);
            update_user.then(async data => {  

              //email
                // nodemail.main(email,otp);
                return responses.sendResponse(res, 'success', "Email has been sent, Please verify your account.");

            }).catch(err => {
              return responses.sendSqlQueryFailResponse(res, err);
            });
          }
          else
          {
            return responses.sendResponse(res,'fail', "Sorry, Email already exists please choose a different one.");
          } 

        }

      }).catch(err => {
        return responses.sendSqlQueryFailResponse(res, err);
      });

    }catch (err) {
      return responses.sendSqlQueryFailResponse(res, err);
    }

  }else{
    return responses.sendResponse(res, 'fail', "Sorry json parameter are missing");
  }

}



//-----------------------------------------  LOGIN---

exports.login = async (req, res) => {

  const { email, password } = req.body

  if(email && password)
  {
    User.findOne({email:email}).then(check => {

      if(!check || check.length == 0)
      {
        return responses.sendResponse(res, 'fail','Sorry,The email address you entered were invalid.');
      }
      else
      {
          //verification check
          if(check.verify  == 'false')
          {
            return responses.sendResponse(res, 'fail', "Sorry, Your email address not verify, Please complete your signup process.");
          } 

          //Block Check
          if(check.block != 0)
          {
            return responses.sendResponse(res, 'fail', "Sorry, your account has been blocked. please contact administrator");
          }

          //Password check
          check.comparePassword(password, function(err, isMatch) { 
            if(isMatch===true)
            {
              let token = generateJwtToken(check.id);
              return responses.sendSuccessfullyTokenResponse(res, check, token, 'success', "Successfully log-in");
            }
            else
            {
              return responses.sendResponse(res, 'fail', "Sorry, The email address or password you entered were invalid");
            }
          });
      }

    }).catch(err=>{
      return responses.sendSqlQueryFailResponse(res, err);
    });
  }
  else
  {
    return responses.sendResponse(res, 'fail', "Sorry json parameter are missing");
  }

}


//----------------------------- VERIFY --

exports.verify = async (req, res) => {

  const { email, otp } = req.body

  if(email && otp)
    {
      User.findOne({email:email}).then(check =>{

        if(!check || check.length ==0)
        {
          return responses.sendResponse(res, 'fail','Sorry,The email address you entered were invalid.');
        }
        else
        {
          //OTP check
          if(check.otp != otp)
          {
            return responses.sendResponse(res, 'fail','Sorry, Invalid otp please enter a valid otp.');
          }
          else
            {
              User.findByIdAndUpdate(check._id, {                
                verify: 'true'
              }, {new: true}).then(update => {

                if(!update || update.length == 0)
                {
                  return responses.sendResponse(res, 'fail','Something went wrong,Please try again later.');
                }
                else
                {     
                  let token = generateJwtToken(check.id);
                  return responses.sendSuccessfullyTokenResponse(res, update, token, 'success', "Thank you for verifying your email address.");
                }
              }).catch(err=>{
                return responses.sendSqlQueryFailResponse(res, err);
              });
            }
        }

      }).catch(err=>{
        return responses.sendSqlQueryFailResponse(res, err);
      });
    }
  else
    {
      return responses.sendResponse(res, 'fail', "Sorry json parameter are missing");
    }

}



//------------------------ Socail_signup--

exports.socail_signup = async (req, res) => {

  const { signup_type,email,token } = req.body


  // Validate Request
  if (!signup_type) {
    return responses.sendResponse(res, "fail", "Signup Type can not be empty");
  }

  let isExistingUser, Gen_token;
  try {

    if(signup_type == 'Gmail') {
      isExistingUser=await User.findOne({email:email}).exec();
    }
    else if( !isExistingUser && (signup_type == 'Facebook' || signup_type == 'Twitter') ){
      isExistingUser=await User.findOne({token:token}).exec();
    }

    //if user alreeady exists
    if(isExistingUser)
    {
      // check signup match
      if(isExistingUser.signup_type != signup_type)
      {
        return responses.sendResponse(res, "fail", "Sorry, You already logged-in with "+isExistingUser.signup_type+", now you can not signup with "+signup_type);
      }

      Gen_token = generateJwtToken(isExistingUser.id);
      return responses.sendSuccessfullyTokenResponse(res, isExistingUser, Gen_token, "success", "Successfully log-in");
    }
    else
    {
        //Create new account
        const userData = getSocailUserData(req);
        userData.save().then(async data => {        
            Gen_token = generateJwtToken(data.id);
            return responses.sendSuccessfullyTokenResponse(res, data, Gen_token, 'success', "Successfully log-in");
        }).catch(err => {
            return responses.sendSqlQueryFailResponse(res, err);
        });
    }

  }catch (err) {
    return responses.sendSqlQueryFailResponse(res, err);
  }
}


//------------------------ Forgot--

exports.forgot = async (req, res) => {

  const { email } = req.body

  // Validate Request
  if (!email) {
    return responses.sendResponse(res, "fail", "Email address can not be empty");
  }

  User.findOne({email:email}).then(check => {

    if(!check || check.length == 0)
    {
      return responses.sendResponse(res, 'fail','Sorry,The email address you entered were invalid.');
    }
    else 
    {
        //verification check
        if(check.verify  == 'false')
        {
          return responses.sendResponse(res, 'fail', "Sorry, Your email address not verify, Please complete your signup process.");
        }

        //Block Check
        if(check.block != 0)
        {
          return responses.sendResponse(res, 'fail', "Sorry, your account has been blocked. please contact administrator");
        }

        const otp=getOtp();

        User.findByIdAndUpdate(check._id, { otp: otp},{new: true}).then(update => {

          if(!update || update.length == 0)
          {
            return responses.sendResponse(res, 'fail','Something went wrong,Please try again later.');
          }

          //email
          nodemail.main(email,otp);
          return responses.sendResponse(res, 'success', "Email has been sent successfully");

        }).catch(err => {
          return responses.sendSqlQueryFailResponse(res, err);
        });
    }

  }).catch(err=>{
    return responses.sendSqlQueryFailResponse(res, err);
  });

}



//------------------------ Reset Password--

exports.reset_password = async (req, res) => {

  const { user_id,password } = req.body

  if(user_id && password)
  {
    const hashedPassword = await bcrypt.hash(password, 10);
    User.findByIdAndUpdate(user_id, {password: hashedPassword}, {new: true}).then(check =>{

      if(!check || check.length == 0)
      {
        return responses.sendResponse(res, 'fail','Sorry,The email address you entered were invalid.');
      }

      let token = generateJwtToken(check.id);
      return responses.sendSuccessfullyTokenResponse(res, check, token, 'success', "Password has been reset successfully");

    }).catch(err=>{
      return responses.sendSqlQueryFailResponse(res, err);
    });
    
  }
  else
  {
    return responses.sendResponse(res, 'fail', "Sorry json parameter are missing");
  }

}



//Get Otp 4 digit
function getOtp()
{
  var otp=Math.floor(1111 + Math.random() * 9999);
  otp = String(otp);
  otp = otp.substring(0,4);
  return otp;
}

//Insert user
function getUserData(req,otp){
  let request=req.body;

  const new_user = new User({
    name: request.name,
    lastname: request.lastname,
    email: request.email,
    password: request.password,
    country: request.country,
    otp:otp    
  });
  return new_user;
}

//Update user
function  updateUserData (req,check,otp){
  let request=req.body;
  const update_user = User.findByIdAndUpdate(check._id, {
      name: request.name,
      lastname: request.lastname,
      country: request.country,
      otp:otp
    }, { new: true });
  return update_user;
}

function getSocailUserData(req){
  let request=req.body;
  const new_user = new User({
    name: request.name,
    lastname: request.lastname,
    email: request.email,
    token: request.token,
    country: request.country,
    signup_type: request.signup_type,
    verify:'true'    
  });
  return new_user;
}


//JWT Token
function generateJwtToken(id) {
  return jwt.sign({ id: id }, config.secret, { expiresIn: 345600 }); // expires in 4 days
}