package kr.co.handshake.common.advice;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.*;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@EnableScheduling
@RequiredArgsConstructor
public class BatchScheduler {

    private final Job job;
    private final JobLauncher jobLauncher;

    @Scheduled(fixedDelay = 30000)
    private void startJob() {
        try {
            Map<String, JobParameter> jobParameterMap = new HashMap<>();

            SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date time = new Date();

            String time1 = format1.format(time);

            jobParameterMap.put("requestDate", new JobParameter(time1));
            JobParameters parameters = new JobParameters(jobParameterMap);
            JobExecution jobExecution = jobLauncher.run(job, parameters);

            while (jobExecution.isRunning()) {
                log.info("isRunning.....");
            }

        } catch (JobExecutionAlreadyRunningException e) {
            e.printStackTrace();
        } catch (JobRestartException e) {
            e.printStackTrace();
        } catch (JobInstanceAlreadyCompleteException e) {
            e.printStackTrace();
        } catch (JobParametersInvalidException e) {
            e.printStackTrace();
        }
    }
}
