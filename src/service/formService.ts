import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface représentant le modèle de données pour un formulaire
interface IFormulaire {
  id: number;
  type: string;
  label: string;
  options: string[];
}


interface IFormulaireDocument extends Document {
  formulaires: IFormulaire[];
}

interface IFormulaireModel extends Model<IFormulaireDocument> {}


const formulaireSchema = new Schema<IFormulaireDocument, IFormulaireModel>({
  formulaires: [
    {
      id: { type: Number, required: true },
      type: { type: String, required: true },
      label: { type: String, required: true },
      options: { type: [String], required: true },
    },
  ],
});


const Formulaire = mongoose.model<IFormulaireDocument, IFormulaireModel>('Form', formulaireSchema);


class FormService {
  async saveForm(formDataArray: IFormulaire[]): Promise<void> {
    try {
      console.log('Connexion à la base de données...');
      await mongoose.connect('mongodb://localhost:27017/typeform');
      console.log('Connexion à la base de données réussie !');
      console.log(formDataArray);
      // Sauvegarder les formulaires dans la base de données
      const form = new Formulaire({ formulaires: formDataArray });
      await form.save();
      console.log('Formulaires sauvegardés avec succès !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des formulaires', error);
    } finally {
      mongoose.disconnect();
    }
  }

  async getForm(): Promise<IFormulaire[] | null | undefined> {
    try {
      console.log('Connexion à la base de données...');
      await mongoose.connect('mongodb://localhost:27017/typeform');
      console.log('Connexion à la base de données réussie !');
      // Récupérer les formulaires de la base de données
      const result = await Formulaire.findOne();
      console.log('Formulaires récupérés avec succès !');
      if (result?.formulaires) {
        return result.formulaires;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des formulaires', error);
    } finally {
      mongoose.disconnect();
    }
  }
}

// Exportation de la classe FormService
export default new FormService();
