import React from 'react'

const Footer = ({lightMode}) => {
  return (
    <>
        <footer className={lightMode ? " py-3 border-t-2 border-t-black border-opacity-30" : " py-3 border-t-2 border-t-[#ffffff4d] border-opacity-25" }>
            <div className="mx-auto text-center">
                <p >&copy; 2024 Food MealMate. All Rights Reserverd.</p>
            </div>
        </footer>
    </>
  )
}

export default Footer
