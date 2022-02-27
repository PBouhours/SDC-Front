import MainLayout from '../layout/MainLayout';
import image from '../../assets/ducati.png';

function Home() {
  return (
    <MainLayout>
      <div className="bg-black">
        <img src={image} alt="moto" className="h-screen w-screen static" />
        <div className="absolute bottom-1/2 w-screen">
          <div className=" h-full flex justify-center">
            <h1 className="text-red-500 text-4xl mr-2">STOCK</h1>
            <h1 className="text-white text-4xl">DUCATI</h1>
            <h1 className="text-green-700 text-4xl ml-2">CLUB</h1>
          </div>
          <h1 className="text-white text-4xl mt-8">BIENVENUE</h1>
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
