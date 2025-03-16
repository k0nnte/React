import { Iform } from '../other/interfase';
import '../style/deteils.css';
interface DeteilProps {
  data: Partial<Iform>;
}

const Deteil: React.FC<DeteilProps> = (prop) => {
  const imageBase64 = prop.data.image as string;
  return (
    <div className="wrapper_deteils">
      <p className="pazzle">{prop.data.name}</p>
      <p className="pazzle">{prop.data.age}</p>
      <p className="pazzle">{prop.data.email}</p>
      <p className="pazzle">{prop.data.password1}</p>
      <p className="pazzle">{prop.data.password2}</p>
      <p className="pazzle">{prop.data.gender}</p>
      <img src={imageBase64} alt="Uploaded" className="image" />
    </div>
  );
};

export default Deteil;
