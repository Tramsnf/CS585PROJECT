import UserService from "../utilities/UserService"

const Welcome = () => (
  <div className="relative w-screen h-screen bg-[url('assets/landpagebg.jpg')] bg-no-repeat bg-cover">
    <div className="absolute flex items-center justify-center z-20 w-screen h-screen top-0 left-0 bg-gradient-to-r from-lightleft to-darkright">
      <div className="pl-10 pr-10 inline-block bottom-10 right-40 p-5 text-white font-bold">
        <div className="inline-block" style={{width:'60vw'}} >
          <div style={{fontSize:'50px'}}>The students'</div>
          <div style={{fontSize:'150px'}} className="overline p-0.5">Portal</div>
          <div style={{fontSize:'24px'}}>A platform for students and lecturers</div>
        </div>
      </div>
      <div className="cursor-pointer z-50 absolute pl-10 pr-10 inline-block bottom-10 right-40 text-lg p-5 text-white font-bold bg-primary" onClick={() => UserService.doLogin()}>Login</div>
    </div>
  </div>
)

export default Welcome
