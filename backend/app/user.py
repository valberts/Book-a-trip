#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

from flask import Blueprint
import pymysql

user = Blueprint('user', __name__)
db = pymysql.connect(host='localhost', user='root', password='', db='SA')
userTableCreateSql = '''
CREATE TABLE IF NOT EXISTS UserInfo(
    id int(8) primary key auto_increment,
    nickname VARCHAR(20),
    email VARCHAR(30) not null
)
'''

@user.route('/userInfo/<username>')
def searchUser():
    cursor = db.cursor()
    cursor.execute(userTableCreateSql)
    sql = 'select * from UserInfo where nickname = ' + username
    cursor.execute(sql)
    results = cursor.fetchall()
    print(results)
    return results


@user.route('/get/')
def get_role():
    return '获取角色 \n'