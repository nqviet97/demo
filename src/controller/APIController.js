import pool from '../configs/connectDB';

let getAllUsers = async (req, res) => {
    //http
    // 404 501
    // json/xml => object
    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let { fistName, lastName, email, address } = req.body;

    if (!fistName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('insert into users(fistName, lastName, email, address) values (?, ?, ?, ?)',
        [fistName, lastName, email, address]);

    return res.status(200).json({
        message: 'ok'
    })
}

let updateUser = async (req, res) => {
    let { fistName, lastName, email, address, id } = req.body;
    if (!fistName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('update users set fistName= ?, lastName = ? , email = ? , address= ? where id = ?',
        [fistName, lastName, email, address, id]);

    return res.status(200).json({
        message: 'ok'
    })
}

let deleteUser = async (req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('delete from users where id = ?', [userId])
    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}