// Use the global React variable provided by the CDN
const { useState, useEffect } = React;
// d3 is already loaded globally from CDN

const GaloisVisualizer = () => {
  const [currentView, setCurrentView] = useState('fieldExtension');
  const [polynomial, setPolynomial] = useState('x^3 - 2');
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Field extension visualization
  const FieldExtensionVisualizer = () => {
    const [step, setStep] = useState(0);
    
    // Example of a cubic extension Q(∛2)
    const extensionSteps = [
      { name: "ℚ", description: "The rational field" },
      { name: "ℚ(∛2)", description: "Adjoining the cube root of 2" },
      { name: "ℚ(∛2, ω)", description: "Adjoining a primitive cube root of unity" },
      { name: "ℚ(∛2, ω, ω²∛2)", description: "The splitting field of x³-2" }
    ];
    
    return (
      <div className="p-4 border rounded-lg bg-white shadow-lg">
        <h3 className="text-xl font-bold mb-4">Field Extension Tower: {polynomial}</h3>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md bg-gray-100 p-4 rounded-lg">
            {extensionSteps.map((field, index) => (
              <div 
                key={index}
                className={`p-3 mb-2 rounded-lg transition-all duration-500 ${
                  index <= step ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                <div className="font-bold">{field.name}</div>
                <div className="text-sm">{field.description}</div>
                {index < extensionSteps.length - 1 && (
                  <div className="flex justify-center my-2">
                    {index < step && <div className="h-8 border-l-2 border-white"></div>}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex gap-4">
            <button 
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <button 
              onClick={() => setStep(Math.min(extensionSteps.length - 1, step + 1))}
              disabled={step === extensionSteps.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Automorphism animation
  const AutomorphismAnimator = () => {
    const [currentAutomorphism, setCurrentAutomorphism] = useState(0);
    
    // For x³-2, the Galois group is S₃, with 6 automorphisms
    const automorphisms = [
      { name: "Identity", mapping: "∛2 → ∛2, ω → ω" },
      { name: "σ₁", mapping: "∛2 → ω∛2, ω → ω" },
      { name: "σ₂", mapping: "∛2 → ω²∛2, ω → ω" },
      { name: "τ", mapping: "∛2 → ∛2, ω → ω²" },
      { name: "τσ₁", mapping: "∛2 → ω∛2, ω → ω²" },
      { name: "τσ₂", mapping: "∛2 → ω²∛2, ω → ω²" }
    ];
    
    // Complex plane for roots
    useEffect(() => {
      if (isPlaying) {
        const interval = setInterval(() => {
          setCurrentAutomorphism((prev) => (prev + 1) % automorphisms.length);
        }, 2000 / animationSpeed);
        return () => clearInterval(interval);
      }
    }, [isPlaying, animationSpeed]);
    
    // Visualization of the roots in the complex plane
    useEffect(() => {
      const svg = d3.select("#complex-plane");
      svg.selectAll("*").remove();
      
      const width = 300;
      const height = 300;
      const margin = 40;
      
      // Create scales
      const xScale = d3.scaleLinear()
        .domain([-2, 2])
        .range([margin, width - margin]);
        
      const yScale = d3.scaleLinear()
        .domain([-2, 2])
        .range([height - margin, margin]);
      
      // Draw axes
      svg.append("line")
        .attr("x1", margin)
        .attr("y1", height/2)
        .attr("x2", width - margin)
        .attr("y2", height/2)
        .attr("stroke", "black");
        
      svg.append("line")
        .attr("x1", width/2)
        .attr("y1", margin)
        .attr("x2", width/2)
        .attr("y2", height - margin)
        .attr("stroke", "black");
      
      // Label axes
      svg.append("text")
        .attr("x", width - margin + 10)
        .attr("y", height/2 - 10)
        .text("Re");
        
      svg.append("text")
        .attr("x", width/2 + 10)
        .attr("y", margin - 10)
        .text("Im");
      
      // Draw the cube roots of 2
      const cubeRootOf2 = Math.pow(2, 1/3);
      
      // Original roots
      const roots = [
        { x: cubeRootOf2, y: 0 },                               // ∛2
        { x: -0.5 * cubeRootOf2, y: 0.866 * cubeRootOf2 },     // ω∛2
        { x: -0.5 * cubeRootOf2, y: -0.866 * cubeRootOf2 }     // ω²∛2
      ];
      
      // Different mappings based on the current automorphism
      // This is simplified - in a real application we'd compute the actual mappings
      const mappings = [
        [0, 1, 2],  // Identity: roots[0] -> roots[0], roots[1] -> roots[1], roots[2] -> roots[2]
        [1, 2, 0],  // σ₁: roots[0] -> roots[1], roots[1] -> roots[2], roots[2] -> roots[0]
        [2, 0, 1],  // σ₂: roots[0] -> roots[2], roots[1] -> roots[0], roots[2] -> roots[1]
        [0, 2, 1],  // τ: roots[0] -> roots[0], roots[1] -> roots[2], roots[2] -> roots[1]
        [1, 0, 2],  // τσ₁: roots[0] -> roots[1], roots[1] -> roots[0], roots[2] -> roots[2]
        [2, 1, 0]   // τσ₂: roots[0] -> roots[2], roots[1] -> roots[1], roots[2] -> roots[0]
      ];
      
      // Colors for each root
      const colors = ["#4285F4", "#EA4335", "#FBBC05"];
      
      // Draw the roots
      roots.forEach((root, i) => {
        const mappedIndex = mappings[currentAutomorphism][i];
        
        svg.append("circle")
          .attr("cx", xScale(root.x))
          .attr("cy", yScale(root.y))
          .attr("r", 8)
          .attr("fill", colors[i])
          .attr("stroke", "black")
          .attr("stroke-width", 1);
          
        // Draw arrows for the mapping
        if (i !== mappedIndex) {
          const mappedRoot = roots[mappedIndex];
          
          // Calculate midpoint for the curved arrow
          const midX = (root.x + mappedRoot.x) / 2;
          const midY = (root.y + mappedRoot.y) / 2;
          const offset = 0.5; // Offset for the curve
          
          // Create an arc path
          const path = d3.path();
          path.moveTo(xScale(root.x), yScale(root.y));
          path.quadraticCurveTo(
            xScale(midX + offset), 
            yScale(midY + offset),
            xScale(mappedRoot.x), 
            yScale(mappedRoot.y)
          );
          
          svg.append("path")
            .attr("d", path)
            .attr("fill", "none")
            .attr("stroke", colors[i])
            .attr("stroke-width", 2)
            .attr("marker-end", "url(#arrow)");
        }
      });
      
      // Add arrowhead marker
      svg.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 8)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "black");
        
    }, [currentAutomorphism]);
    
    return (
      <div className="p-4 border rounded-lg bg-white shadow-lg">
        <h3 className="text-xl font-bold mb-4">Automorphism Animation: {polynomial}</h3>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <svg id="complex-plane" width="300" height="300"></svg>
            <div className="mt-4 text-center">
              <div className="font-bold">Roots of {polynomial}</div>
              <div className="flex justify-center mt-2 gap-4">
                <div><span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span> ∛2</div>
                <div><span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span> ω∛2</div>
                <div><span className="inline-block w-3 h-3 bg-yellow-500 rounded-full"></span> ω²∛2</div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h4 className="font-bold text-lg">Current Automorphism</h4>
              <div className="text-xl my-2">{automorphisms[currentAutomorphism].name}</div>
              <div className="mb-4">Mapping: {automorphisms[currentAutomorphism].mapping}</div>
              
              <div className="mt-4">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {isPlaying ? "Pause" : "Play Animation"}
                </button>
              </div>
              
              <div className="mt-4">
                <label className="block mb-2">Animation Speed</label>
                <input 
                  type="range" 
                  min="0.5" 
                  max="3" 
                  step="0.5" 
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="flex gap-2 mt-4">
                {automorphisms.map((auto, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentAutomorphism(idx)}
                    className={`px-2 py-1 rounded ${
                      currentAutomorphism === idx 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200'
                    }`}
                  >
                    {auto.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <h2 className="text-2xl font-bold mb-6">Galois Theory Visualizer</h2>
      
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setCurrentView('fieldExtension')}
            className={`px-4 py-2 rounded-lg ${
              currentView === 'fieldExtension' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200'
            }`}
          >
            Field Extension Builder
          </button>
          <button
            onClick={() => setCurrentView('automorphism')}
            className={`px-4 py-2 rounded-lg ${
              currentView === 'automorphism' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200'
            }`}
          >
            Automorphism Animator
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Polynomial</label>
          <select 
            value={polynomial}
            onChange={(e) => setPolynomial(e.target.value)}
            className="w-full md:w-64 p-2 border rounded"
          >
            <option value="x^3 - 2">x³ - 2</option>
            <option value="x^4 - 2">x⁴ - 2</option>
            <option value="x^3 - x - 1">x³ - x - 1</option>
            <option value="x^5 - 1">x⁵ - 1</option>
          </select>
        </div>
      </div>
      
      {currentView === 'fieldExtension' ? <FieldExtensionVisualizer /> : <AutomorphismAnimator />}
      
      <div className="mt-8 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-bold mb-2">About This Visualization</h3>
        <p>
          This tool helps visualize key concepts from Galois Theory, particularly the 
          relationship between field extensions and automorphisms. For the polynomial 
          x³ - 2, we're visualizing the splitting field ℚ(∛2, ω) where ω is a primitive 
          cube root of unity, and showing how different automorphisms permute the roots.
        </p>
        <p className="mt-2">
          The Field Extension Builder shows the tower of fields from ℚ up to the splitting field, 
          while the Automorphism Animator shows how each automorphism in the Galois group 
          acts on the roots of the polynomial.
        </p>
      </div>
    </div>
  );
};

// Export for use in the browser
window.GaloisVisualizer = GaloisVisualizer;