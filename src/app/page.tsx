import Intro from './components/intro';
import Main from './components/main';
import Programs from './components/programs';
import Registration from './components/registration';

export default function Home() {
  return (
    <div>
      <Main />
      <Intro />
      <Programs />
      <Registration />
    </div>
  );
}
