const express = require('express');
const { getAllEmails, getUserByEmail } = require('../controllers/individualController')

const getEmails = async () => {
    let individuals = await getAllEmails();
    let emails = [];
    for (individual of individuals){
        emails.push(individual.email)
    }
    return emails;
}

const validUserEmail = async (req, res, next) => {
    // Production email
    const email = req.oidc.user.email

    // Dev valid email test
    // let email = "jbdoe@gmail.com";

    // Dev invalid email test
    // let email = "fjdkslifosa@gmail.com"


    const validEmails = await getEmails()

    if (!email in validEmails) {
        res.status(403).send("Access denied");
        return;
    }
    next();
}

const validHeadOfHousehold = async (req, res, next) => {
    // Production email
    let email = req.oidc.user.email;

    // Dev valid test email
    // const email = "jbdoe@gmail.com";

    // Dev invalid test email
    // const email = "jmjingle@gmail.com";

    const user = await getUserByEmail(email)
    console.log(user.headOfHousehold)
    if (!user.headOfHousehold) {
        res.status(403).send("Access denied");
        return;
    }
    next();
}

module.exports = { validUserEmail, validHeadOfHousehold }