import React from 'react'

const Footer = ({completedTaskCount = 0, activeTaskCount = 0}) => {
  return (
    <>
      {completedTaskCount + activeTaskCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTaskCount > 0 && (
              <>
                Tuyet voi ban da hoan thanh {completedTaskCount} viec
                {activeTaskCount > 0 &&
                  `, con ${activeTaskCount} viec nua thoi. Co len!`}
              </>
            )}

            {completedTaskCount === 0 && activeTaskCount > 0 && (
              <>
                Hay bat dau lam {activeTaskCount} nhiem vu nao!
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
}

export default Footer
