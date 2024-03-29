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
    // const email = req.oidc.user.email
    let email = "jbdoe@gmail.com";
    const validEmails = await getEmails()

    if (!email in validEmails) {
        res.status(403).send("Access denied.");
        return;
    }
    next();
}

const validHeadOfHousehold = async (req, res, next) => {
    // let email = req.oidc.user.email;
    let email = "jbdoe@gmail.com";
    const user = await getUserByEmail(email)
    if (user.headOfHousehold) {
        res.status(403).send("Access denied.");
        return;
    }
    next();
}

module.exports = { validUserEmail, validHeadOfHousehold }