"use strict";
const express = require('express');
const app = express();
var nodemailer = require('nodemailer');


var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');


//for email template
app.set('views' + '../views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


var exports=module.exports={};

// async..await is not allowed in global scope, must use a wrapper
exports.main = function (mail,otp){

    var readHTMLFile = function(path, callback) {
        fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "gmail account",
            pass: "Mail password" 
        }
    });


    
    // const path='/var/www/html/WLB/views/email.html';
    const path='../views/email.html';

    readHTMLFile(path, function(err, html) {
        var template = handlebars.compile(html);

        var replacements = {
            otp: otp
        }; 

        var htmlToSend = template(replacements);
        var mailOptions = {
            from: 'From name',
            to: mail,
            subject: 'Account has been created.',                
            html: htmlToSend
        };
            
        transporter.sendMail( mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    });
   
};