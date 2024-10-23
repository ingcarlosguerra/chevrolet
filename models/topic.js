import mongoose,{Schema} from "mongoose";

const topicSchema =new Schema(
    {
        nombre: String,
        apellido: String,
        email: String,
        telefono: String,
        direccion: String,
        modeloCarro: String,
        asesorComercial: String,

    },
    {
        timestamps: true,
    }
)


const Topic = mongoose.models.Topic || mongoose.model("Topic",topicSchema);
export default Topic;