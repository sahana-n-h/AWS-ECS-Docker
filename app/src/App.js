import React, { useState } from 'react';
import { Cloud, Server, Container, Network, Shield, Zap, Database, Globe, ArrowRight, ChevronDown, ChevronUp, Package, FileText } from 'lucide-react';

const AWSECSGuide = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [expandedSection, setExpandedSection] = useState('overview');

  const components = {
    cluster: {
      icon: <Cloud className="w-8 h-8" />,
      title: "ECS Cluster",
      description: "A logical grouping of compute resources (EC2 instances or Fargate) where containers run",
      details: "Acts as the foundation layer that manages compute capacity and resource allocation"
    },
    service: {
      icon: <Server className="w-8 h-8" />,
      title: "ECS Service",
      description: "Ensures desired number of tasks are running and handles load balancing",
      details: "Maintains application availability and automatically replaces failed tasks"
    },
    task: {
      icon: <Container className="w-8 h-8" />,
      title: "Task Definition",
      description: "Blueprint that specifies containers, CPU, memory, and networking requirements",
      details: "Contains container configurations, port mappings, and environment variables"
    },
    networking: {
      icon: <Network className="w-8 h-8" />,
      title: "VPC Networking",
      description: "Secure network isolation with subnets, security groups, and load balancers",
      details: "Provides network security and connectivity between containers and external services"
    },
    ecr: {
      icon: <Package className="w-8 h-8" />,
      title: "Amazon ECR",
      description: "Fully managed Docker container registry for storing and managing container images",
      details: "Secure, scalable registry integrated with ECS for seamless container deployment"
    }
  };

  const launchTypes = [
    {
      name: "AWS Fargate",
      icon: <Zap className="w-6 h-6" />,
      description: "Serverless compute for containers",
      pros: ["No server management", "Pay per use", "Automatic scaling"],
      cons: ["Higher cost per vCPU/GB", "Less customization"]
    },
    {
      name: "EC2 Launch Type",
      icon: <Server className="w-6 h-6" />,
      description: "Run containers on EC2 instances",
      pros: ["Cost effective at scale", "Full control", "Custom AMIs"],
      cons: ["Server management", "Capacity planning required"]
    }
  ];

  const Section = ({ id, title, children, defaultExpanded = false }) => {
    const isExpanded = expandedSection === id;
    return (
      <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setExpandedSection(isExpanded ? null : id)}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 text-left flex items-center justify-between hover:from-blue-100 hover:to-indigo-100 transition-colors"
        >
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {isExpanded && (
          <div className="px-6 py-4 bg-white">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <Container className="w-12 h-12" />
            <h1 className="text-4xl font-bold">AWS Elastic Container Service (ECS)</h1>
          </div>
          <p className="text-xl text-blue-100">
            Fully managed container orchestration service for deploying and scaling containerized applications
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Overview Section */}
        <Section id="overview" title="What is AWS ECS?" defaultExpanded>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-700 mb-4">
                Amazon Elastic Container Service (ECS) is a highly scalable container orchestration service 
                that supports Docker containers and allows you to run and scale containerized applications on AWS.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Fully managed service with built-in security</span>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                  <span>Serverless option with AWS Fargate</span>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>Integrates with AWS services and tools</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Key Benefits</h3>
              <ul className="space-y-2 text-sm">
                <li>• No container orchestration software to install</li>
                <li>• Automatic scaling and load balancing</li>
                <li>• Deep AWS integration (IAM, VPC, CloudWatch)</li>
                <li>• Support for both Fargate and EC2 launch types</li>
                <li>• Built-in service discovery and load balancing</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Architecture Section */}
        <Section id="architecture" title="ECS Architecture Components">
          <div className="mb-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {Object.entries(components).map(([key, component]) => (
                <div
                  key={key}
                  onClick={() => setSelectedComponent(key)}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all transform hover:scale-105 ${
                    selectedComponent === key
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`mb-3 ${selectedComponent === key ? 'text-blue-600' : 'text-gray-600'}`}>
                      {component.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{component.title}</h3>
                    <p className="text-sm text-gray-600">{component.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedComponent && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-blue-600">
                    {components[selectedComponent].icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {components[selectedComponent].title}
                  </h3>
                </div>
                <p className="text-gray-700">{components[selectedComponent].details}</p>
              </div>
            )}
          </div>

          {/* Architecture Diagram */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold mb-6 text-center">ECS Architecture Flow</h3>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Database className="w-8 h-8 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Task Definition</span>
                <span className="text-xs text-gray-500">Container Specs</span>
              </div>
              
              <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 lg:rotate-0" />
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <Server className="w-8 h-8 text-green-600" />
                </div>
                <span className="text-sm font-medium">ECS Service</span>
                <span className="text-xs text-gray-500">Orchestration</span>
              </div>
              
              <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 lg:rotate-0" />
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <Cloud className="w-8 h-8 text-purple-600" />
                </div>
                <span className="text-sm font-medium">ECS Cluster</span>
                <span className="text-xs text-gray-500">Compute Resources</span>
              </div>
              
              <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 lg:rotate-0" />
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <Container className="w-8 h-8 text-orange-600" />
                </div>
                <span className="text-sm font-medium">Running Tasks</span>
                <span className="text-xs text-gray-500">Active Containers</span>
              </div>
            </div>
          </div>
        </Section>

        {/* ECR & Docker Section */}
        <Section id="ecr-docker" title="Amazon ECR & Docker Integration">
          <div className="space-y-6">
            {/* ECR Overview */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
              <div className="flex items-start gap-4">
                <Package className="w-12 h-12 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Amazon Elastic Container Registry (ECR)</h3>
                  <p className="text-gray-700 mb-4">
                    ECR is AWS's fully managed Docker container registry that integrates seamlessly with ECS. 
                    It provides secure, scalable, and reliable storage for your container images.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">Built-in security scanning</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">High performance transfers</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Globe className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">Global replication</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Docker to ECS Workflow */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-6 text-center">Docker to ECS Deployment Workflow</h3>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
                <div className="flex flex-col items-center max-w-32">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-center">1. Create Dockerfile</span>
                  <span className="text-xs text-gray-500 text-center">Define container specs</span>
                </div>
                
                <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 lg:rotate-0" />
                
                <div className="flex flex-col items-center max-w-32">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <Container className="w-8 h-8 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-center">2. Build Image</span>
                  <span className="text-xs text-gray-500 text-center">docker build</span>
                </div>
                
                <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 lg:rotate-0" />
                
                <div className="flex flex-col items-center max-w-32">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                    <Package className="w-8 h-8 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-center">3. Push to ECR</span>
                  <span className="text-xs text-gray-500 text-center">docker push</span>
                </div>
                
                <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 lg:rotate-0" />
                
                <div className="flex flex-col items-center max-w-32">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                    <Database className="w-8 h-8 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-center">4. Task Definition</span>
                  <span className="text-xs text-gray-500 text-center">Reference ECR URI</span>
                </div>
                
                <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 lg:rotate-0" />
                
                <div className="flex flex-col items-center max-w-32">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                    <Cloud className="w-8 h-8 text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-center">5. Deploy on ECS</span>
                  <span className="text-xs text-gray-500 text-center">Run containers</span>
                </div>
              </div>
            </div>

            {/* Docker Commands */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  ECR Commands
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-gray-600 mb-1">Login to ECR:</div>
                    <code className="bg-gray-800 text-green-400 p-2 rounded block text-xs">
                      aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com
                    </code>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Tag and Push:</div>
                    <code className="bg-gray-800 text-green-400 p-2 rounded block text-xs">
                      docker tag my-app:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/my-app:latest<br/>
                      docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
                    </code>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  Dockerfile Best Practices
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Use multi-stage builds for smaller images
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Leverage build cache with proper layer ordering
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Use .dockerignore to exclude unnecessary files
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Run as non-root user for security
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Include health checks in your containers
                  </li>
                </ul>
              </div>
            </div>

            {/* ECR Features */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-4">Key ECR Features for ECS</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h5 className="font-medium mb-1">Security Scanning</h5>
                  <p className="text-xs text-gray-600">Automatic vulnerability scanning for container images</p>
                </div>
                <div className="text-center">
                  <Database className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h5 className="font-medium mb-1">Lifecycle Policies</h5>
                  <p className="text-xs text-gray-600">Automated cleanup of old images to save costs</p>
                </div>
                <div className="text-center">
                  <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h5 className="font-medium mb-1">Cross-Region Replication</h5>
                  <p className="text-xs text-gray-600">Replicate images across AWS regions</p>
                </div>
                <div className="text-center">
                  <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h5 className="font-medium mb-1">Integration</h5>
                  <p className="text-xs text-gray-600">Seamless integration with ECS, EKS, and Lambda</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
        <Section id="launch-types" title="ECS Launch Types">
          <div className="grid md:grid-cols-2 gap-6">
            {launchTypes.map((type, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-blue-600">{type.icon}</div>
                  <h3 className="text-xl font-semibold">{type.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{type.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Advantages</h4>
                    <ul className="text-sm space-y-1">
                      {type.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-700 mb-2">Considerations</h4>
                    <ul className="text-sm space-y-1">
                      {type.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">!</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Launch Types Section */}
        <Section id="use-cases" title="Common Use Cases">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
              <Globe className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Web Applications</h3>
              <p className="text-sm text-gray-600">
                Deploy scalable web applications with automatic load balancing and health checks
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
              <Database className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Microservices</h3>
              <p className="text-sm text-gray-600">
                Build and deploy microservices architecture with service discovery and mesh networking
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200">
              <Zap className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold mb-2">Batch Processing</h3>
              <p className="text-sm text-gray-600">
                Run batch jobs and data processing workloads with automatic scaling and resource optimization
              </p>
            </div>
          </div>
        </Section>

        {/* Use Cases Section */}
        <Section id="getting-started" title="Getting Started with ECS">
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Quick Start Steps</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <strong>Create a Task Definition</strong>
                  <p className="text-sm text-gray-600">Define your container specifications, CPU, memory, and networking requirements</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <strong>Create an ECS Cluster</strong>
                  <p className="text-sm text-gray-600">Set up your compute environment (Fargate or EC2)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                <div>
                  <strong>Create and Run a Service</strong>
                  <p className="text-sm text-gray-600">Deploy your application with desired task count and load balancing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                <div>
                  <strong>Monitor and Scale</strong>
                  <p className="text-sm text-gray-600">Use CloudWatch metrics and auto-scaling policies to optimize performance</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default AWSECSGuide;