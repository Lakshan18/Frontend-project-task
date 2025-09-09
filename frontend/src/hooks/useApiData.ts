import { useState, useEffect } from 'react';
import { apiService } from '@/api/apiService';
import { useAppStore } from '@/store/useAppStore';

export const useApiData = () => {
  const [pipelineData, setPipelineData] = useState<any>(null);
  const [brokerData, setBrokerData] = useState<any>(null);
  const [workflowData, setWorkflowData] = useState<any>(null);
  const { setLoading } = useAppStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [pipeline, broker, workflow] = await Promise.all([
          apiService.getBorrowerPipeline(),
          apiService.getBrokerInfo(),
          apiService.getOnboardingWorkflow()
        ]);
        
        setPipelineData(pipeline);
        setBrokerData(broker);
        setWorkflowData(workflow);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading]);

  return { pipelineData, brokerData, workflowData };
};