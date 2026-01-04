
export function Skletonloading(){
    return(
        <div className="animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-40 mb-4" />

      <div className="flex gap-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="relative flex-none w-100 h-[450px] bg-white dark:bg-card rounded-2xl shadow-lg p-4 animate-pulse">
    
      

      {/* Image */}
      <div className="w-full h-60 rounded-lg bg-gray-300" />



      {/* Content */}
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-11/12" />
        <div className="h-4 bg-gray-300 rounded w-4/5" />

        <div className="mt-3 space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-10/12" />
        </div>

        {/* Footer */}
        <div className="flex gap-4 mt-4">
          <div className="h-4 bg-gray-300 rounded w-20" />
          <div className="h-4 bg-gray-300 rounded w-20" />
        </div>
      </div>
    </div>
         
        ))}
      </div>
    </div>

    );
}