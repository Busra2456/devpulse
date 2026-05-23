import bcrypt from "bcryptjs";
import { pool } from "../../db/index"
import type { IUser } from "./user.interface";

const createUserIntoDB = async(payLoad : IUser)=>{
      const {name,email,password,role} = payLoad;
      const hashPassword = await bcrypt.hash(password,10)
      // console.log(hashPassword)
       const result = await pool.query(`
            INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,
            COALESCE($4,'contributor')) RETURNING *`,[name,email,hashPassword,role]);
            delete result.rows[0].password;
            return result;

}

const getAllUsersFromDB = async () =>{
       const result = await pool.query(`
           
            SELECT id,name,email,role,created_at,updated_at FROM users
            `);
            return result;
}

const getSingleUsersFromDB = async (id:string) =>{
       const result = await pool.query(`
                   SELECT id,name,email,role,created_at,updated_at
                   FROM users
                   WHERE id=$1

                  `,[id]);
                  return result

}

const updatedUserFromDB = async ( payLoad : IUser, id : string ) =>{
      const {name,password} = payLoad;
       const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
       const result = await pool.query(`
                UPDATE users 
                SET 
                name=COALESCE($1,name),
                password=COALESCE($2,password)
                WHERE id=$3
                RETURNING *
            `,
            [name,hashedPassword,id]);
            return result
}

const deleteUsersFromDB = async (id : string) =>{
      const result = await pool.query(`
                  DELETE FROM users WHERE id=$1
                  `,[id],);
                  return result
}

export const userService = {
      createUserIntoDB,
      getAllUsersFromDB,
      getSingleUsersFromDB,
      updatedUserFromDB,
      deleteUsersFromDB  

};