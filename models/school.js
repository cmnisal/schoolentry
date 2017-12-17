var db = require('../config/db');
var bcrypt = require('bcryptjs');
var mysqlJson = require('mysql-json');
var async = require('async');

/*exports.insert = function (applicant ,pool, done) {
    pool.getConnection(function (err, connection) {
        if(err) throw err;
        var query = connection.query('INSERT INTO school SET ?, name = (TIMESTAMPDIFF(YEAR,?,CURDATE()))', [applicant, applicant.date_of_birth], function (error, results) {
            if(error) throw error;
        });
        console.log('Insert Query: ' + query);
        console.log('School Inserted!');
        connection.release();
    });
};*/

exports.insert = function(school_id,
                          name,
                          postal_number,
                          road,
                          city,
                          Province,
                          max_value_of_grade_one_entries,
                          buddhism_precentage,
                          christianity_precentage,
                          islam_precentage,
                          Hindu_percentage,
                          religion_others_precentage,
                          pool){

    var school = {
        school_id: school_id,
        name:name,
        postal_number:postal_number,
        road:road,
        city:city,
        Province:Province,
        max_value_of_grade_one_entries:max_value_of_grade_one_entries ,
        buddhism_precentage:buddhism_precentage,
        christianity_precentage:christianity_precentage,
        islam_precentage:islam_precentage,
        Hindu_percentage:Hindu_percentage,
        religion_others_precentage:religion_others_precentage};

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        var query = connection.query('INSERT INTO school SET ?', school, function (error, results) {
            if(error) throw error;
        });
        console.log('Insert query: ' + query.sql);
        console.log('School Inserted!');
        connection.release();
    });
};

exports.getGuardian=function (guardianNIC,pool) {
    return new Promise(fn);

    function fn(resolve, reject) {
        pool.getConnection(function (error, connection) {
            if (error) {
                return reject(error)
            } else {
                connection.query('SELECT `first_name` FROM `applicant` WHERE `guardian_nic_no` = ?', guardianNIC, function (err, rows) {
                    if (err) {
                        return reject(err);
                    } else {
                        connection.release();
                        return resolve(rows);
                    }
                })
            }
        });
    }
}

exports.getSchoolID=function (username,pool) {
    return new Promise(fn);

    function fn(resolve, reject) {
        pool.getConnection(function (error, connection) {
            if (error) {
                return reject(error)
            } else {
                connection.query('SELECT `school_id` FROM `officer_school` WHERE  officer_username = ?', username, function (err, uids) {
                    if (err) {
                        return reject(err);
                    } else {
                        connection.release();
                        return resolve(uids);
                    }
                })
            }
        });
    }
}


