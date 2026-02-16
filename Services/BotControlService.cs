namespace BotA.Services
{
    public class BotControlService
    {
        private volatile bool _isRunning = false;
        private volatile bool _isPaused = false;
        private readonly object _lockObject = new();
        private string _status = "Stopped";
        private DateTime? _startTime;
        private DateTime? _stopTime;

        public bool IsRunning
        {
            get => _isRunning;
            set
            {
                lock (_lockObject)
                {
                    _isRunning = value;
                    UpdateStatus();
                }
            }
        }

        public bool IsPaused
        {
            get => _isPaused;
            set
            {
                lock (_lockObject)
                {
                    _isPaused = value;
                    UpdateStatus();
                }
            }
        }

        public string Status
        {
            get
            {
                lock (_lockObject)
                {
                    return _status;
                }
            }
        }

        public DateTime? StartTime => _startTime;
        public DateTime? StopTime => _stopTime;

        public void Start()
        {
            lock (_lockObject)
            {
                _isRunning = true;
                _isPaused = false;
                _startTime = DateTime.UtcNow;
                _stopTime = null;
                UpdateStatus();
            }
        }

        public void Stop()
        {
            lock (_lockObject)
            {
                _isRunning = false;
                _isPaused = false;
                _stopTime = DateTime.UtcNow;
                UpdateStatus();
            }
        }

        public void Pause()
        {
            lock (_lockObject)
            {
                _isPaused = true;
                UpdateStatus();
            }
        }

        public void Resume()
        {
            lock (_lockObject)
            {
                _isPaused = false;
                UpdateStatus();
            }
        }

        private void UpdateStatus()
        {
            if (!_isRunning)
                _status = "Stopped";
            else if (_isPaused)
                _status = "Paused";
            else
                _status = "Running";
        }

        public bool ShouldRun()
        {
            return _isRunning && !_isPaused;
        }

        public TimeSpan? GetUptime()
        {
            if (_startTime.HasValue && _isRunning)
            {
                return DateTime.UtcNow - _startTime.Value;
            }
            return null;
        }
    }
}
