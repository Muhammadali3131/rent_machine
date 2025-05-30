const sequelize = require("../config/db")
const {DataTypes} = require("sequelize")
const Machine = require("./machine.model")


const Image = sequelize.define(
    "image",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        image_url:{
            type: DataTypes.STRING
        },
        uploaded_at:{
            type:DataTypes.DATEONLY
        },


    }
)

Machine.hasMany(Image)
Image.belongsTo(Machine)

module.exports = Image