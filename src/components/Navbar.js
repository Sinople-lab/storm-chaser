// Martin Carballo Flores
// october 25/2024
// ------------------------------------------
import { Menu, CloudLightning } from 'lucide-react';
// ------------------------------------------
const Navbar = () => {

  const menus = [
      {
        id:1,
        title:'about me',
        link:'https://sinople-lab.github.io/home/'
      },
      {
        id:2,
        title:'linkedin',
        link:'https://www.linkedin.com/in/martin-carballo-flores/'
      },
      {
        id:3,
        title:'contact',
        link:'https://sinople-lab.github.io/homework/'
      }
  ]
      
  return (
      <nav className="customBG p-4">
      <div className="container flex items-center space-x-2">
        <h1 className="myh1"><CloudLightning size={24} /></h1>
        <h1 className="myh1 text-2xl font-bold">Ashur's storm chaser</h1>
        <button className="text-white absolute right-10 dropdown">
          <Menu size={24} />
          <div className='dropdown-content'>
              {
                menus.map((menu)=>(
                  <a className='menuButton' key={menu.id} href={menu.link}>{menu.title}</a>
                ))
              }
          </div>
        </button>
      </div>
    </nav>
  )
}

export default Navbar