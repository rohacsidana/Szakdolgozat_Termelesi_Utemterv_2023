﻿using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Globalization;
using System.Security.Cryptography;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UtemtervContext _context;

        public UserController(UtemtervContext context)
        {
            _context = context;
        }
        [EnableCors]
        [HttpGet("list")]
        public IActionResult UserList()
        {
            try
            {
                var userList = _context.UserLists.ToList();

                if (userList.Count() == 0)
                {
                    return NotFound("User not found.");

                }
                return Ok(userList);
            }
            catch (Exception)
            {
                return StatusCode(500, "An Error has occured.");
            }
        }
        [EnableCors]
        [HttpPost("new")]
        public IActionResult NewUser([FromBody] CNewUser user)
        {
            try
            {
                var newU = _context.Users.FromSqlInterpolated($"newUser {user.Name}, {user.BirthDate}, {user.Email}, {CreateMD5(user.Password)}, {user.Post}").ToList();
                return Ok(newU);
            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }

        [EnableCors]
        [HttpPut("update")]

        public IActionResult UpdateUser([FromBody] CUpdateUser user)
        {
            try
            {
                var updateUser = _context.Database.ExecuteSqlInterpolated($"updateUser {user.UserID}, {user.Name}, {user.BirthDate}, {user.Email}, {CreateMD5(user.Password)}, {user.Post}");
               // var updateUser = _context.Database.ExecuteSqlInterpolated($"updateUser {220}, {"VDSVSDVVVVVVVVVV"}, {"20020202"}, {"a@g.v"}, {CreateMD5("ucés")}, {8}");
                return Ok(updateUser);
            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }

        [EnableCors]
        [HttpDelete("delete/{id}")]

        public IActionResult deleteUser(int id)
        {
            try
            {
                var numberOfDeleted = _context.Database.ExecuteSqlRaw($"deleteUser {id}");
                return Ok(numberOfDeleted);
            }
            catch(Exception e)
            {
                return StatusCode(404, e);
            }
        }

        public class CNewUser
        {
            public string Name { get; set; }
            public string BirthDate { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public int Post { get; set; }

        }
        public class CUpdateUser:CNewUser
        {
            public int UserID { get; set; }    

        }

        public static string CreateMD5(string input)
        {
            using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
            {
                byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                return Convert.ToHexString(hashBytes);            }
        }

    }


}
