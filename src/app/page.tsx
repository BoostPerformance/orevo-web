import Intro from './components/intro';
import MainImage from './components/main';
import Programs from './components/programs';
import Registration from './components/registration';

export default function Home() {
  return (
    <div className="p-0">
      <MainImage />
      <Intro />
      <Programs />
      <Registration />
    </div>
  );
}
