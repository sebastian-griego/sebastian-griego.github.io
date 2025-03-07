import React, { useState, useEffect, useRef } from 'react';

const ProofVisualizer = () => {
  // Primary states for the visualization
  const [currentProof, setCurrentProof] = useState('hilbert-nullstellensatz');
  const [detailView, setDetailView] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [nodePositions, setNodePositions] = useState({});
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  
  // Reference to the SVG element
  const svgRef = useRef();

  // Comprehensive proof catalog with detailed steps
  const proofs = {
    'hilbert-nullstellensatz': {
      name: "Hilbert's Nullstellensatz",
      description: "Establishes the fundamental connection between varieties and radical ideals: IV(I) = √I when K is algebraically closed",
      overview: "This theorem is the cornerstone of algebraic geometry, showing how geometric objects and algebraic objects correspond perfectly in an algebraically closed field.",
      steps: [
        {
          id: "step0",
          label: "Theorem Statement",
          content: "If K is algebraically closed, then I(V(I)) = √I for any ideal I in K[x₁,...,xₙ].",
          type: "theorem"
        },
        {
          id: "step1",
          label: "Containment I(V(I)) ⊇ √I",
          content: "First, we need to show that √I ⊆ I(V(I)). Let f ∈ √I, so fᵏ ∈ I for some k. For any point p ∈ V(I), all polynomials in I vanish at p, so fᵏ(p) = 0. This means f(p) = 0, so f ∈ I(V(I)).",
          type: "proof-step",
          prerequisites: ["radical-def", "vanishing-at-points"]
        },
        {
          id: "step2",
          label: "Weak Nullstellensatz",
          content: "If I is a proper ideal in K[x₁,...,xₙ] and K is algebraically closed, then V(I) is non-empty. In particular, if I ≠ K[x₁,...,xₙ], then there exists a point p ∈ V(I).",
          type: "lemma",
          prerequisites: ["maximal-ideal-point"]
        },
        {
          id: "step3",
          label: "Rabinowitsch Trick",
          content: "For any f ∉ I, introduce a new variable t and consider the ideal J = I + ⟨1 - tf⟩ in K[x₁,...,xₙ,t]. If 1 ∈ J, then we can derive a contradiction showing f ∈ √I.",
          type: "technique",
          prerequisites: ["step2"]
        },
        {
          id: "step4",
          label: "Contradiction Argument",
          content: "Assuming I(V(I)) ⊋ √I, we get a polynomial f ∈ I(V(I)) with f ∉ √I. Using the Rabinowitsch trick and the weak Nullstellensatz, we arrive at a contradiction by constructing a point that must simultaneously belong to V(I) and not satisfy f(p) = 0.",
          type: "proof-step",
          prerequisites: ["step3"]
        },
        {
          id: "step5",
          label: "Conclusion",
          content: "Therefore, I(V(I)) = √I when K is algebraically closed, establishing the exact correspondence between radical ideals and varieties.",
          type: "conclusion",
          prerequisites: ["step1", "step4"]
        }
      ],
      connections: [
        { source: "step0", target: "step1", label: "begin proof" },
        { source: "step1", target: "step2", label: "for other direction" },
        { source: "step2", target: "step3", label: "apply" },
        { source: "step3", target: "step4", label: "leads to" },
        { source: "step4", target: "step5", label: "therefore" },
        { source: "radical-def", target: "step1", label: "uses" },
        { source: "vanishing-at-points", target: "step1", label: "applies" },
        { source: "maximal-ideal-point", target: "step2", label: "corresponds to" },
      ],
      supportingConcepts: [
        { id: "radical-def", label: "Definition of Radical", content: "The radical of an ideal I, denoted √I, is the set of all elements f such that fᵏ ∈ I for some positive integer k." },
        { id: "vanishing-at-points", label: "Vanishing at Points", content: "For a point p ∈ V(I), all polynomials in I evaluate to zero at p." },
        { id: "maximal-ideal-point", label: "Maximal Ideals and Points", content: "In an algebraically closed field K, maximal ideals in K[x₁,...,xₙ] correspond exactly to points in Aⁿ." },
      ],
      stepLayout: {
        "step0": { x: 400, y: 100 },
        "step1": { x: 400, y: 180 },
        "step2": { x: 400, y: 260 },
        "step3": { x: 400, y: 340 },
        "step4": { x: 400, y: 420 },
        "step5": { x: 400, y: 500 },
        "radical-def": { x: 200, y: 180 },
        "vanishing-at-points": { x: 600, y: 180 },
        "maximal-ideal-point": { x: 600, y: 260 },
      }
    },
    'groebner-basis-theorem': {
      name: "Groebner Basis Theorem",
      description: "Demonstrates that every ideal has a Groebner basis, and how this basis provides a generalization of polynomial division to multiple variables",
      overview: "This fundamental theorem shows that for any ideal, there exists a special generating set (the Groebner basis) that enables algorithmic computations with polynomials.",
      steps: [
        {
          id: "step0",
          label: "Theorem Statement",
          content: "Let I be an ideal in K[x₁,...,xₙ]. Let ⟨LT(I)⟩ be its ideal of leading terms, and let ⟨LT(I)⟩ = ⟨xᵅ¹,...,xᵅᵗ⟩. There exist polynomials g₁,...,gₜ ∈ I such that LM(gᵢ) = xᵅⁱ. Furthermore, I = ⟨g₁,...,gₜ⟩.",
          type: "theorem"
        },
        {
          id: "step1",
          label: "Monomial Ordering Assumption",
          content: "We first fix a monomial ordering < that is a total order, respects multiplication, and is a well-ordering on the set of monomials.",
          type: "assumption",
          prerequisites: ["monomial-order-def"]
        },
        {
          id: "step2",
          label: "Leading Term Ideal Properties",
          content: "For an ideal I, the ideal ⟨LT(I)⟩ is generated by the leading terms of all polynomials in I. By the Hilbert Basis Theorem, this ideal is finitely generated by a set of monomials {xᵅ¹,...,xᵅᵗ}.",
          type: "proof-step",
          prerequisites: ["hilbert-basis", "leading-term-def"]
        },
        {
          id: "step3",
          label: "Constructing the Groebner Basis",
          content: "For each generator xᵅⁱ of ⟨LT(I)⟩, we can find a polynomial gᵢ ∈ I with LM(gᵢ) = xᵅⁱ. We show that the set {g₁,...,gₜ} generates I.",
          type: "proof-step",
          prerequisites: ["step2"]
        },
        {
          id: "step4",
          label: "Division Algorithm Application",
          content: "Using the division algorithm with respect to {g₁,...,gₜ}, any f ∈ I can be written as f = q₁g₁ + ... + qₜgₜ + r, where no term in r is divisible by any LT(gᵢ).",
          type: "proof-step",
          prerequisites: ["division-algorithm", "step3"]
        },
        {
          id: "step5",
          label: "Remainder Must Be Zero",
          content: "The remainder r must be in I. Since no term in r is divisible by any LT(gᵢ), if r ≠ 0, then LT(r) would not be in ⟨LT(I)⟩, which is a contradiction. Therefore r = 0.",
          type: "proof-step",
          prerequisites: ["step4"]
        },
        {
          id: "step6",
          label: "Conclusion",
          content: "Therefore, I = ⟨g₁,...,gₜ⟩ and {g₁,...,gₜ} is a Groebner basis for I.",
          type: "conclusion",
          prerequisites: ["step5"]
        }
      ],
      connections: [
        { source: "step0", target: "step1", label: "begin proof" },
        { source: "step1", target: "step2", label: "allows" },
        { source: "step2", target: "step3", label: "leads to" },
        { source: "step3", target: "step4", label: "apply" },
        { source: "step4", target: "step5", label: "analyze" },
        { source: "step5", target: "step6", label: "therefore" },
        { source: "monomial-order-def", target: "step1", label: "defines" },
        { source: "hilbert-basis", target: "step2", label: "enables" },
        { source: "leading-term-def", target: "step2", label: "clarifies" },
        { source: "division-algorithm", target: "step4", label: "method for" },
      ],
      supportingConcepts: [
        { id: "monomial-order-def", label: "Monomial Ordering", content: "A monomial ordering is a total order on monomials that respects multiplication and is a well-ordering." },
        { id: "hilbert-basis", label: "Hilbert Basis Theorem", content: "If R is a Noetherian ring, then R[y] is also Noetherian. Consequently, every ideal in K[x₁,...,xₙ] is finitely generated." },
        { id: "leading-term-def", label: "Leading Term", content: "Given a polynomial f and a monomial ordering, LT(f) is the largest term of f according to the ordering." },
        { id: "division-algorithm", label: "Division Algorithm", content: "A generalization of polynomial division to multivariate polynomials given a monomial ordering." },
      ],
      stepLayout: {
        "step0": { x: 400, y: 100 },
        "step1": { x: 400, y: 180 },
        "step2": { x: 400, y: 260 },
        "step3": { x: 400, y: 340 },
        "step4": { x: 400, y: 420 },
        "step5": { x: 400, y: 500 },
        "step6": { x: 400, y: 580 },
        "monomial-order-def": { x: 200, y: 180 },
        "hilbert-basis": { x: 200, y: 260 },
        "leading-term-def": { x: 600, y: 260 },
        "division-algorithm": { x: 600, y: 420 },
      }
    },
    'finite-field-theorem': {
      name: "Structure of Finite Fields",
      description: "Characterizes the fundamental properties of fields with finitely many elements",
      overview: "This theorem establishes the size, structure, and uniqueness of finite fields, showing that they must have pⁿ elements for some prime p.",
      steps: [
        {
          id: "step0",
          label: "Theorem Statement",
          content: "Let K be a field with a finite number of elements. Then: (1) K has pⁿ elements for some prime p and n ∈ N. (2) K is isomorphic to Fₚ[x]/m(x) for some irreducible polynomial m(x) of degree n. (3) Any two fields with pⁿ elements are isomorphic.",
          type: "theorem"
        },
        {
          id: "step1",
          label: "Characteristic Analysis",
          content: "The characteristic of K must be a prime p. The prime field (subfield generated by 1) is isomorphic to Fₚ = Z/pZ.",
          type: "proof-step",
          prerequisites: ["characteristic-def"]
        },
        {
          id: "step2",
          label: "Vector Space Structure",
          content: "K is a finite-dimensional vector space over Fₚ with dimension n for some n. Thus, K has pⁿ elements.",
          type: "proof-step",
          prerequisites: ["step1", "vector-space"]
        },
        {
          id: "step3",
          label: "Field Extension Construction",
          content: "K is a field extension of Fₚ generated by some element α, so K = Fₚ(α). This element α is algebraic over Fₚ with minimal polynomial m(x) of degree n.",
          type: "proof-step",
          prerequisites: ["step2", "primitive-element"]
        },
        {
          id: "step4",
          label: "Polynomial Quotient Structure",
          content: "K is isomorphic to Fₚ[x]/⟨m(x)⟩ where m(x) is irreducible of degree n over Fₚ.",
          type: "proof-step",
          prerequisites: ["step3"]
        },
        {
          id: "step5",
          label: "Multiplicative Group Structure",
          content: "The multiplicative group K* is cyclic of order pⁿ-1. So there exists an element η whose powers generate all non-zero elements of K.",
          type: "proof-step",
          prerequisites: ["step2", "group-theory"]
        },
        {
          id: "step6",
          label: "Uniqueness Proof",
          content: "Any two fields of size pⁿ are isomorphic to Fₚ[x]/⟨m(x)⟩ for some irreducible polynomial m(x) of degree n. The isomorphism class is determined solely by p and n.",
          type: "proof-step",
          prerequisites: ["step4", "irreducible-poly-counts"]
        },
        {
          id: "step7",
          label: "Subfield Condition",
          content: "A field with pⁿ elements has a subfield with pᵈ elements if and only if d divides n.",
          type: "conclusion",
          prerequisites: ["step6", "field-extension-theory"]
        }
      ],
      connections: [
        { source: "step0", target: "step1", label: "begin proof" },
        { source: "step1", target: "step2", label: "leads to" },
        { source: "step2", target: "step3", label: "implies" },
        { source: "step3", target: "step4", label: "shows" },
        { source: "step2", target: "step5", label: "also implies" },
        { source: "step4", target: "step6", label: "leads to" },
        { source: "step6", target: "step7", label: "finally" },
        { source: "characteristic-def", target: "step1", label: "defines" },
        { source: "vector-space", target: "step2", label: "structure of" },
        { source: "primitive-element", target: "step3", label: "theorem about" },
        { source: "group-theory", target: "step5", label: "uses" },
        { source: "irreducible-poly-counts", target: "step6", label: "counts" },
        { source: "field-extension-theory", target: "step7", label: "from" }
      ],
      supportingConcepts: [
        { id: "characteristic-def", label: "Field Characteristic", content: "The characteristic of a field is the smallest positive integer p such that p·1 = 0, or 0 if no such integer exists." },
        { id: "vector-space", label: "Vector Space Structure", content: "A field extension K/F can be viewed as a vector space over F." },
        { id: "primitive-element", label: "Primitive Element Theorem", content: "A finite separable field extension is generated by a single element." },
        { id: "group-theory", label: "Finite Abelian Group Theory", content: "The structure theory of finite abelian groups, particularly the classification of cyclic groups." },
        { id: "irreducible-poly-counts", label: "Irreducible Polynomial Counts", content: "Results on counting irreducible polynomials of a given degree over finite fields." },
        { id: "field-extension-theory", label: "Field Extension Theory", content: "The theory of field extensions, particularly finite extensions and their properties." }
      ],
      stepLayout: {
        "step0": { x: 400, y: 100 },
        "step1": { x: 400, y: 180 },
        "step2": { x: 400, y: 260 },
        "step3": { x: 400, y: 340 },
        "step4": { x: 250, y: 420 },
        "step5": { x: 550, y: 420 },
        "step6": { x: 250, y: 500 },
        "step7": { x: 400, y: 580 },
        "characteristic-def": { x: 200, y: 180 },
        "vector-space": { x: 200, y: 260 },
        "primitive-element": { x: 600, y: 340 },
        "group-theory": { x: 700, y: 420 },
        "irreducible-poly-counts": { x: 100, y: 500 },
        "field-extension-theory": { x: 600, y: 580 },
      }
    }
  };

  // Setup the initial state
  useEffect(() => {
    const proof = proofs[currentProof];
    if (proof) {
      const initialPositions = detailView ? proof.stepLayout : {};
      setNodePositions(initialPositions);
      setSelectedNode(null);
      setCurrentStep(0);
    }
  }, [currentProof, detailView]);

  // Handle node click
  const handleNodeClick = (node) => {
    setSelectedNode(node);
    
    if (node.type === "proof-step" || node.type === "lemma" || node.type === "conclusion") {
      // Extract the step number from the id
      const stepMatch = node.id.match(/step(\d+)/);
      if (stepMatch) {
        setCurrentStep(parseInt(stepMatch[1]));
      }
    }
  };

  // Function to change the current proof
  const changeProof = (proofId) => {
    setCurrentProof(proofId);
    setDetailView(false);
  };

  // Toggle detail view
  const toggleDetailView = () => {
    setDetailView(!detailView);
  };

  // Function to navigate through proof steps
  const navigateSteps = (direction) => {
    const proof = proofs[currentProof];
    const proofSteps = proof.steps.filter(s => s.id.startsWith('step'));
    
    if (direction === 'next' && currentStep < proofSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedNode(proofSteps[currentStep + 1]);
    } else if (direction === 'prev' && currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedNode(proofSteps[currentStep - 1]);
    }
  };

  // Function to calculate the path for an arrow between nodes
  const calculateArrowPath = (source, target, label) => {
    const sourcePos = nodePositions[source];
    const targetPos = nodePositions[target];
    
    if (!sourcePos || !targetPos) return '';
    
    // Calculate the direction vector
    const dx = targetPos.x - sourcePos.x;
    const dy = targetPos.y - sourcePos.y;
    
    // Normalize the vector
    const length = Math.sqrt(dx * dx + dy * dy);
    const unitX = dx / length;
    const unitY = dy / length;
    
    // Start and end points (slightly offset from the node centers)
    const nodeRadius = 20;
    const startX = sourcePos.x + unitX * nodeRadius;
    const startY = sourcePos.y + unitY * nodeRadius;
    const endX = targetPos.x - unitX * nodeRadius;
    const endY = targetPos.y - unitY * nodeRadius;
    
    // Create a curved path
    const hasReverseLink = proofs[currentProof]?.connections.some(l => 
      l.source === target && l.target === source
    );
    
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    
    // Add perpendicular offset for curvature
    const perpX = -unitY * (hasReverseLink ? 30 : 10);
    const perpY = unitX * (hasReverseLink ? 30 : 10);
    
    const controlX = midX + perpX;
    const controlY = midY + perpY;
    
    return `M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`;
  };

  // Function to calculate arrow head points
  const calculateArrowHead = (source, target) => {
    const sourcePos = nodePositions[source];
    const targetPos = nodePositions[target];
    
    if (!sourcePos || !targetPos) return '';
    
    // Calculate the direction vector
    const dx = targetPos.x - sourcePos.x;
    const dy = targetPos.y - sourcePos.y;
    
    // Normalize the vector
    const length = Math.sqrt(dx * dx + dy * dy);
    const unitX = dx / length;
    const unitY = dy / length;
    
    // Calculate the point where the arrow touches the target node
    const nodeRadius = 20;
    const tipX = targetPos.x - unitX * nodeRadius;
    const tipY = targetPos.y - unitY * nodeRadius;
    
    // Calculate perpendicular vector for arrow head
    const perpX = -unitY;
    const perpY = unitX;
    
    // Arrow head size
    const headSize = 10;
    
    // Points for the arrow head
    const point1X = tipX - unitX * headSize + perpX * headSize / 2;
    const point1Y = tipY - unitY * headSize + perpY * headSize / 2;
    const point2X = tipX - unitX * headSize - perpX * headSize / 2;
    const point2Y = tipY - unitY * headSize - perpY * headSize / 2;
    
    return `${tipX},${tipY} ${point1X},${point1Y} ${point2X},${point2Y}`;
  };

  // Function to get the midpoint of a path (for placing labels)
  const getPathMidpoint = (source, target) => {
    const sourcePos = nodePositions[source];
    const targetPos = nodePositions[target];
    
    if (!sourcePos || !targetPos) return { x: 0, y: 0 };
    
    // Get the midpoint with some adjustment for curvature
    const midX = (sourcePos.x + targetPos.x) / 2;
    const midY = (sourcePos.y + targetPos.y) / 2;
    
    // Calculate the direction vector
    const dx = targetPos.x - sourcePos.x;
    const dy = targetPos.y - sourcePos.y;
    
    // Normalize the vector
    const length = Math.sqrt(dx * dx + dy * dy);
    const unitX = dx / length;
    const unitY = dy / length;
    
    // Add perpendicular offset for the label to follow the curve
    const hasReverseLink = proofs[currentProof]?.connections.some(l => 
      l.source === target && l.target === source
    );
    
    const perpX = -unitY * (hasReverseLink ? 25 : 8);
    const perpY = unitX * (hasReverseLink ? 25 : 8);
    
    return {
      x: midX + perpX,
      y: midY + perpY
    };
  };

  // Drag functionality
  const [dragState, setDragState] = useState({
    isDragging: false,
    nodeId: null,
    offset: { x: 0, y: 0 }
  });

  const handleMouseDown = (nodeId, e) => {
    if (!nodePositions[nodeId]) return;
    
    const { x, y } = nodePositions[nodeId];
    const offset = {
      x: e.clientX - x,
      y: e.clientY - y
    };
    
    setDragState({
      isDragging: true,
      nodeId,
      offset
    });
  };

  const handleMouseMove = (e) => {
    if (!dragState.isDragging) return;
    
    const { nodeId, offset } = dragState;
    const containerRect = svgRef.current.getBoundingClientRect();
    
    const newX = e.clientX - containerRect.left - offset.x;
    const newY = e.clientY - containerRect.top - offset.y;
    
    setNodePositions(prev => ({
      ...prev,
      [nodeId]: {
        x: newX,
        y: newY
      }
    }));
  };

  const handleMouseUp = () => {
    setDragState({
      isDragging: false,
      nodeId: null,
      offset: { x: 0, y: 0 }
    });
  };

  useEffect(() => {
    if (dragState.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState]);

  // Update SVG dimensions based on container size
  useEffect(() => {
    if (svgRef.current) {
      const updateDimensions = () => {
        const container = svgRef.current.parentElement;
        if (container) {
          setDimensions({
            width: container.clientWidth,
            height: Math.max(container.clientHeight, 600)
          });
        }
      };
      
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }
  }, []);

  // Determine which nodes and connections to display based on current view mode
  const getVisibleNodes = () => {
    const proof = proofs[currentProof];
    if (!proof) return { nodes: [], connections: [] };
    
    if (detailView) {
      // In detail view, show all steps and supporting concepts
      const steps = proof.steps;
      const supportingConcepts = proof.supportingConcepts || [];
      const connections = proof.connections || [];
      
      return {
        nodes: [...steps, ...supportingConcepts],
        connections
      };
    } else {
      // In overview mode, just show the theorem statement
      return {
        nodes: [proof.steps[0]],
        connections: []
      };
    }
  };

  const getNodeTypeColor = (type) => {
    switch(type) {
      case "theorem": return "#3b82f6"; // blue
      case "proof-step": return "#10b981"; // green
      case "lemma": return "#8b5cf6"; // purple
      case "assumption": return "#f59e0b"; // amber
      case "technique": return "#ef4444"; // red
      case "conclusion": return "#6366f1"; // indigo
      default: return "#64748b"; // slate
    }
  };

  const getNodeTypeShape = (type) => {
    switch(type) {
      case "theorem": return "M0,-24 L24,0 L0,24 L-24,0 Z"; // diamond
      case "lemma": return "M-18,-18 L18,-18 L18,18 L-18,18 Z"; // square
      case "conclusion": return "M0,-24 L24,0 L0,24 L-24,0 Z"; // diamond
      default: return ""; // circle (default)
    }
  };

  const { nodes, connections } = getVisibleNodes();

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-700 text-white p-3 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Algebraic Geometry Proof Visualizer</h1>
          <p className="text-sm">Explore detailed theorem proofs and logical connections</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleDetailView}
            className="px-3 py-1 bg-white text-blue-700 rounded hover:bg-blue-100"
          >
            {detailView ? "Simple View" : "Detailed View"}
          </button>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for proof selection and info */}
        <div className="w-72 bg-gray-100 p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Theorem Library</h2>
          
          <div className="space-y-2">
            {Object.keys(proofs).map(proofId => (
              <button
                key={proofId}
                onClick={() => changeProof(proofId)}
                className={`block w-full text-left px-3 py-2 rounded ${
                  currentProof === proofId 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white hover:bg-blue-100'
                }`}
              >
                {proofs[proofId].name}
              </button>
            ))}
          </div>
          
          {currentProof && (
            <div className="mt-6">
              <h3 className="font-medium text-lg">{proofs[currentProof].name}</h3>
              <p className="text-sm mt-1 text-gray-600 mb-4">{proofs[currentProof].description}</p>
              
              <div className="bg-white p-3 rounded shadow">
                <h4 className="font-medium">Overview</h4>
                <p className="text-sm mt-1">{proofs[currentProof].overview}</p>
              </div>
              
              {detailView && (
                <div className="mt-4 bg-blue-50 p-3 rounded shadow border border-blue-200">
                  <h4 className="font-medium text-blue-800">Proof Navigation</h4>
                  <div className="flex justify-between mt-2">
                    <button 
                      onClick={() => navigateSteps('prev')}
                      disabled={currentStep === 0}
                      className={`px-3 py-1 rounded ${
                        currentStep === 0 
                          ? 'bg-gray-200 text-gray-500' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      Previous
                    </button>
                    <span className="px-2 py-1">{`Step ${currentStep} of ${proofs[currentProof].steps.filter(s => s.id.startsWith('step')).length - 1}`}</span>
                    <button 
                      onClick={() => navigateSteps('next')}
                      disabled={currentStep >= proofs[currentProof].steps.filter(s => s.id.startsWith('step')).length - 1}
                      className={`px-3 py-1 rounded ${
                        currentStep >= proofs[currentProof].steps.filter(s => s.id.startsWith('step')).length - 1
                          ? 'bg-gray-200 text-gray-500' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              
              {selectedNode && (
                <div className="mt-6 p-3 bg-white rounded shadow">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2" 
                      style={{ backgroundColor: getNodeTypeColor(selectedNode.type) }}
                    ></div>
                    <h3 className="font-bold">{selectedNode.label}</h3>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{selectedNode.type}</div>
                  <p className="text-sm mt-2">{selectedNode.content}</p>
                  
                  {selectedNode.prerequisites && selectedNode.prerequisites.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium">Prerequisites:</h4>
                      <ul className="text-xs list-disc pl-5 mt-1">
                        {selectedNode.prerequisites.map(prereq => (
                          <li key={prereq}>{
                            nodes.find(n => n.id === prereq)?.label || prereq
                          }</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {detailView && (
            <div className="mt-6">
              <h4 className="font-medium mb-2">Legend</h4>
              <div className="text-xs space-y-1 bg-white p-2 rounded">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span>Theorem</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Proof Step</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span>Lemma</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                  <span>Assumption</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span>Technique</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                  <span>Conclusion</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-slate-500 mr-2"></div>
                  <span>Supporting Concept</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Main visualization area */}
        <div className="flex-1 relative">
          <svg 
            ref={svgRef}
            width={dimensions.width} 
            height={dimensions.height}
            className="w-full h-full"
          >
            {/* Links (connections) */}
            {connections.map((link) => (
              <g key={`${link.source}-${link.target}`}>
                {/* The link path */}
                <path
                  d={calculateArrowPath(link.source, link.target, link.label)}
                  fill="none"
                  stroke={
                    selectedNode && 
                    (link.source === selectedNode.id || link.target === selectedNode.id)
                      ? '#ff6600'
                      : '#999'
                  }
                  strokeWidth={
                    selectedNode && 
                    (link.source === selectedNode.id || link.target === selectedNode.id)
                      ? 2
                      : 1
                  }
                />
                
                {/* Arrow head */}
                <polygon
                  points={calculateArrowHead(link.source, link.target)}
                  fill={
                    selectedNode && 
                    (link.source === selectedNode.id || link.target === selectedNode.id)
                      ? '#ff6600'
                      : '#999'
                  }
                />
                
                {/* Link label */}
                {link.label && (
                  (() => {
                    const pos = getPathMidpoint(link.source, link.target);
                    return (
                      <text
                        x={pos.x}
                        y={pos.y}
                        textAnchor="middle"
                        fontSize="10"
                        fill="#666"
                        className="select-none"
                      >
                        {link.label}
                      </text>
                    );
                  })()
                )}
              </g>
            ))}
            
            {/* Nodes */}
            {nodes.map((node) => {
              const position = nodePositions[node.id] || { x: 400, y: 300 };
              const nodeShape = getNodeTypeShape(node.type);
              const isHighlighted = selectedNode && selectedNode.id === node.id;
              const isCurrentStep = node.id === `step${currentStep}`;
              
              return (
                <g 
                  key={node.id}
                  transform={`translate(${position.x}, ${position.y})`}
                  onClick={() => handleNodeClick(node)}
                  onMouseDown={(e) => handleMouseDown(node.id, e)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Node shape based on type */}
                  {nodeShape ? (
                    <path
                      d={nodeShape}
                      fill={getNodeTypeColor(node.type)}
                      stroke={isHighlighted || isCurrentStep ? '#ff6600' : 'none'}
                      strokeWidth="2"
                    />
                  ) : (
                    <circle
                      r="20"
                      fill={getNodeTypeColor(node.type)}
                      stroke={isHighlighted || isCurrentStep ? '#ff6600' : 'none'}
                      strokeWidth="2"
                    />
                  )}
                  
                  {/* Node label background */}
                  <rect
                    x="-60"
                    y="-45"
                    width="120"
                    height="20"
                    rx="5"
                    fill="rgba(255, 255, 255, 0.9)"
                  />
                  
                  {/* Node label text */}
                  <text
                    textAnchor="middle"
                    y="-30"
                    fontSize="11"
                    fontWeight="600"
                    fill="#333"
                    className="select-none"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
      
      <footer className="bg-gray-200 p-2 text-center text-sm text-gray-600">
        <p>{detailView ? "Click on a node to see details. Drag nodes to rearrange. Use the navigation buttons to follow the proof step-by-step." : "Click 'Detailed View' to explore the complete proof with all logical connections."}</p>
      </footer>
    </div>
  );
};

export default ProofVisualizer;