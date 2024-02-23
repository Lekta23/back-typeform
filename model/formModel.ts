import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/typeform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Définition du schéma du modèle pour un champ d'options
const optionSchema = new mongoose.Schema({
  type: String,
  label: String,
});

// Définition du schéma du modèle pour un formulaire
const formSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  type: { type: String, required: true },
  label: { type: String, required: true },
  options: [optionSchema], // Si options sont présentes, elles suivent le schéma défini
});

// Définition du modèle basé sur le schéma
const Form = mongoose.model('Form', formSchema);

// Fonction pour sauvegarder un formulaire avec un ID unique
const saveFormWithUniqueId = async (formData: any): Promise<void> => {
  try {
    // Créez un nouvel objet Form avec les données du formulaire
    const nouveauForm = new Form(formData);

    // Enregistrez le formulaire dans la base de données
    await nouveauForm.save();

    console.log('Formulaire sauvegardé avec succès !');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du formulaire', error);
  }
};