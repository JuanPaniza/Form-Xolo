function ErrorComponent() {
  return (  
    <>
      <div className="bg-red-100 border-l-4 border-red-500 text-red-600 p-4" role="alert">
        <p className="font-bold">Alert!</p>
        <p>All fields are required.</p>
      </div>
    </>
  );
}

export default ErrorComponent;