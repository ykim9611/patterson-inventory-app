import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

function MyComponent() {
  const contentRef = useRef(null);

  const reactToPrintContent = () => {
    return contentRef.current;
  };

  const handlePrint = useReactToPrint({
    documentTitle: 'SuperFileName',
    // fonts: CUSTOM_FONTS,
  });

  return (
    <div>
      <button onClick={() => handlePrint(reactToPrintContent)}>Print</button>
      <div ref={contentRef}>
        <h1>Print Me</h1>
        <p>This is the content to print.</p>
      </div>
    </div>
  );
}

export default MyComponent;
